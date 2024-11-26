const puppeteer = require('puppeteer');
const config = require('../config/config');
const googleAuthHandler = require('./google-auth-handler');

class ChatGPTHandler {
    constructor() {
        this.browser = null;
        this.page = null;
        this.isInitialized = false;
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    async initialize() {
        try {
            if (this.isInitialized) return;

            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            this.page = await this.browser.newPage();
            
            // 获取 Google 认证数据
            const { cookies, authData } = await googleAuthHandler.getAuthData();

            // 设置 cookies
            await this.page.setCookie(...cookies);

            // 设置认证数据
            await this.page.evaluateOnNewDocument((authData) => {
                // 恢复 localStorage
                authData.localStorage.forEach(([key, value]) => {
                    window.localStorage.setItem(key, value);
                });
                
                // 恢复 sessionStorage
                authData.sessionStorage.forEach(([key, value]) => {
                    window.sessionStorage.setItem(key, value);
                });
            }, authData);

            // 直接访问 ChatGPT
            await this.page.goto(config.chatgpt.chatUrl, {
                waitUntil: 'networkidle0'
            });

            // 检查是否需要点击 Google 登录按钮
            const googleButton = await this.page.$('button[data-provider="google"]');
            if (googleButton) {
                await googleButton.click();
                // 等待自动登录完成
                await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
            }

            // 等待 ChatGPT 界面加载完成
            await this.page.waitForSelector('.text-base', { timeout: 30000 });

            this.isInitialized = true;
            this.setupAutoReLogin();
            
        } catch (error) {
            console.error('ChatGPT initialization error:', error);
            await this.cleanup();
            throw error;
        }
    }

    async checkLoginStatus() {
        try {
            const { cookies } = await googleAuthHandler.getAuthData();
            const isGoogleSessionValid = cookies.some(cookie => 
                cookie.name === 'SSID' && new Date(cookie.expires * 1000) > new Date()
            );

            if (!isGoogleSessionValid) {
                console.log('Google session expired, refreshing...');
                await googleAuthHandler.authenticate();
                await this.initialize();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Login status check error:', error);
            return false;
        }
    }

    async summarizeResults(searchResults) {
        try {
            if (!this.isInitialized) {
                await this.initialize();
            }

            const prompt = this.formatSearchResults(searchResults);
            
            // 清除之前的对话
            await this.clearConversation();

            // 输入新的提示词
            await this.page.waitForSelector('textarea[data-id="root"]');
            await this.page.type('textarea[data-id="root"]', prompt);
            await this.page.keyboard.press('Enter');

            // 等待响应
            await this.waitForResponse();

            // 获取响应文本
            const response = await this.getLatestResponse();

            return response;
        } catch (error) {
            console.error('Summarize error:', error);
            
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`Retrying... Attempt ${this.retryCount}`);
                await this.cleanup();
                this.isInitialized = false;
                return this.summarizeResults(searchResults);
            }
            
            throw error;
        }
    }

    async waitForResponse() {
        try {
            await this.page.waitForFunction(() => {
                const elements = document.querySelectorAll('.markdown-content');
                return elements.length > 0 && !elements[elements.length - 1].closest('.typing');
            }, { timeout: 60000 });
        } catch (error) {
            console.error('Timeout waiting for response');
            throw error;
        }
    }

    async getLatestResponse() {
        return await this.page.evaluate(() => {
            const elements = document.querySelectorAll('.markdown-content');
            return elements[elements.length - 1]?.textContent || '';
        });
    }

    formatSearchResults(results) {
        const formattedResults = results
            .map((r, index) => `[Source ${index + 1}]\n${r._source.title}\n${r._source.content}`)
            .join('\n\n');

        return `Please analyze and summarize the following search results, focusing on the most relevant information. Provide a comprehensive but concise summary:\n\n${formattedResults}\n\nPlease provide your summary in a well-structured format with clear sections.`;
    }

    async clearConversation() {
        try {
            await this.page.click('nav button:first-child'); // 点击"New Chat"按钮
        } catch (error) {
            console.error('Clear conversation error:', error);
        }
    }

    setupAutoReLogin() {
        setInterval(async () => {
            try {
                if (!this.isInitialized) return;
                
                const isLoggedIn = await this.checkLoginStatus();
                if (!isLoggedIn) {
                    console.log('Session expired, re-logging in...');
                    await this.login();
                }
            } catch (error) {
                console.error('Auto re-login error:', error);
            }
        }, 30 * 60 * 1000); // 每30分钟检查一次
    }

    async cleanup() {
        if (this.browser) {
            try {
                await this.browser.close();
            } catch (error) {
                console.error('Browser cleanup error:', error);
            }
            this.browser = null;
            this.page = null;
        }
    }
}

module.exports = new ChatGPTHandler(); 