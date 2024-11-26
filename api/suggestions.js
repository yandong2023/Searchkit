const express = require('express');
const cors = require('cors');
const axios = require('axios');

// 关键词分类配置
const KEYWORD_CATEGORIES = {
    // 基础字母组合
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    
    // 比较类词组
    comparison: ['vs', 'versus', 'or', 'alternative', 'alternatives', 'comparison'],
    
    // 动作类词组
    action: ['how to', 'tutorial', 'guide', 'learn', 'create', 'make', 'use', 'install', 'setup'],
    
    // 属性类词组
    attribute: ['best', 'top', 'free', 'premium', 'pro', 'paid', 'cheap', 'expensive'],
    
    // 时间类词组
    time: ['2024', '2023', 'latest', 'new', 'update', 'version'],
    
    // 功能类词组
    feature: ['features', 'settings', 'options', 'config', 'configuration', 'setup'],
    
    // 问题类词组
    question: ['what is', 'why', 'when', 'where', 'which', 'how', 'can'],
    
    // 下载安装类
    download: ['download', 'install', 'setup', 'crack', 'key', 'license'],
    
    // 评价类词组
    review: ['review', 'reviews', 'rating', 'ratings', 'opinion', 'opinions'],
    
    // 问题类词组
    problem: ['error', 'problem', 'issue', 'bug', 'fix', 'solution', 'solve'],
    
    // 商业类词组
    business: ['price', 'cost', 'pricing', 'buy', 'purchase', 'subscription']
};

// 获取某个分类的建议
async function getCategorySuggestions(keyword, terms) {
    const suggestions = new Set();
    
    await Promise.all(terms.map(async term => {
        try {
            const response = await axios({
                method: 'get',
                url: `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(`${keyword} ${term}`)}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Connection': 'keep-alive',
                    'Cache-Control': 'no-cache'
                },
                timeout: 10000
            });
            
            if (response.data && Array.isArray(response.data[1])) {
                response.data[1].forEach(suggestion => suggestions.add(suggestion));
            }
        } catch (error) {
            console.error(`Error getting suggestions for ${keyword} ${term}:`, error.message);
        }
    }));

    return Array.from(suggestions);
}

// 修改 getBingSuggestions 函数，添加更多错误处理
async function getBingSuggestions(keyword) {
    try {
        console.log('Fetching suggestions for:', keyword);

        const response = await axios({
            method: 'get',
            url: `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(keyword)}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept': 'application/json, text/javascript, */*',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 5000,
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            }
        });

        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Invalid response format');
        }

        return response.data[1] || [];
    } catch (error) {
        console.error('Error in getBingSuggestions:', error);
        return [];
    }
}

// 核心逻辑函数
async function handleSuggestions(keyword) {
    try {
        console.log('Processing keyword:', keyword);
        const suggestions = await getEnhancedSuggestions(keyword);
        return {
            success: true,
            categorizedSuggestions: suggestions,
            source: 'bing'
        };
    } catch (error) {
        console.error('Error processing suggestions:', error);
        throw error;
    }
}

// Vercel Serverless Function
const handler = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const keyword = req.query.keyword;
        console.log('Vercel function received keyword:', keyword);
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                error: 'Keyword is required'
            });
        }

        const result = await handleSuggestions(keyword);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Vercel function error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

// 检查是否在 Vercel 环境
if (process.env.VERCEL) {
    module.exports = handler;
} else {
    // 本地开发环境
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/api/suggestions', async (req, res) => {
        try {
            const keyword = req.query.keyword;
            console.log('Local server received keyword:', keyword);
            
            if (!keyword) {
                return res.status(400).json({
                    success: false,
                    error: 'Keyword is required'
                });
            }

            const result = await handleSuggestions(keyword);
            res.json(result);
        } catch (error) {
            console.error('Local server error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                message: error.message
            });
        }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Local server running on port ${port}`);
    });
} 