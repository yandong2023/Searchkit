const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors({
    origin: '*',  // 允许所有来源
    methods: ['GET', 'POST', 'OPTIONS'],  // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'],  // 允许的请求头
    credentials: true  // 允许发送凭证
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

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

// 关键词建议 API
app.get('/api/suggestions', async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).json({ error: 'Keyword is required' });
        }

        try {
            // 获取所有分类的建议
            const categorizedResults = {};
            
            // 并行获取所有分类的建议
            const promises = Object.entries(KEYWORD_CATEGORIES).map(async ([category, terms]) => {
                const suggestions = await getCategorySuggestions(keyword, terms);
                if (suggestions.length > 0) {
                    categorizedResults[category] = suggestions;
                }
            });

            await Promise.all(promises);

            // 获取基础建议
            const baseSuggestions = await getBingSuggestions(keyword);
            if (baseSuggestions.length > 0) {
                categorizedResults.base = baseSuggestions;
            }

            // 尝试获取搜索热度（示例实现）
            const volumeData = await getSearchVolume(Object.values(categorizedResults).flat());

            res.json({
                success: true,
                categorizedSuggestions: categorizedResults,
                volumeData: volumeData,
                source: 'bing'
            });

        } catch (error) {
            console.error('Error generating suggestions:', error);
            res.status(500).json({
                error: 'Failed to fetch suggestions',
                message: error.message
            });
        }

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
});

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
                timeout: 10000,
                validateStatus: function (status) {
                    return status >= 200 && status < 300;
                }
            });
            
            if (response.data && Array.isArray(response.data[1])) {
                response.data[1].forEach(suggestion => suggestions.add(suggestion));
            }
        } catch (error) {
            console.error(`Error getting suggestions for ${keyword} ${term}:`, error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
        }
    }));

    return Array.from(suggestions);
}

// 获取基础建议
async function getBingSuggestions(keyword) {
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(keyword)}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            },
            timeout: 10000,  // 增加超时时间
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            }
        });
        return response.data[1] || [];
    } catch (error) {
        console.error('Error in getBingSuggestions:', error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        return [];
    }
}

// 获取搜索热度（示例实现）
async function getSearchVolume(keywords) {
    // 这里可以接入实际的搜索量 API
    // 目前返回模拟数据
    return keywords.reduce((acc, keyword) => {
        acc[keyword] = {
            volume: Math.floor(Math.random() * 10000),
            trend: Math.random() > 0.5 ? 'up' : 'down'
        };
        return acc;
    }, {});
}

// 处理多语言路由
const languages = ['de', 'zh', 'ja', 'es', 'ko', 'fr'];
languages.forEach(lang => {
    app.get(`/${lang}`, (req, res) => {
        res.sendFile(path.join(__dirname, '..', lang, 'index.html'));
    });
});

// 默认路由处理
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// 添加错误处理中间件
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}); 