const puppeteer = require('puppeteer');
const config = require('../config/config');

class GoogleAuthHandler {
    constructor() {
        this.cookies = null;
        this.authData = null;
    }

    async authenticate() {
        let browser = null;
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            
            // 设置更真实的用户代理
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            
            // 启用请求拦截
            await page.setRequestInterception(true);
            
            // 处理请求拦截
            page.on('request', (request) => {
                if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
                    request.abort();
                } else {
                    request.continue();
                }
            });

            // 访问 Google 登录页面
            await page.goto('https://accounts.google.com/signin', {
                waitUntil: 'networkidle0'
            });

            // 输入邮箱
            await page.waitForSelector('input[type="email"]');
            await page.type('input[type="email"]', config.email);
            await page.click('input[type="email"]');

            // 输入密码
            await page.waitForSelector('input[type="password"]');
            await page.type('input[type="password"]', config.password);
            await page.click('input[type="password"]');

            // 等待登录完成
            await page.waitForNavigation({
                waitUntil: 'networkidle0'
            });

            // 获取 cookies
            this.cookies = await page.cookies();

            // 获取认证数据
            this.authData = await page.evaluate(() => {
                return {
                    email: document.querySelector('input[type="email"]').value,
                    password: document.querySelector('input[type="password"]').value
                };
            });

            // 关闭浏览器
            await browser.close();
        } catch (error) {
            console.error('登录失败:', error);
        }
    }
} 