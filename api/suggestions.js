const express = require('express');
const cors = require('cors');
const axios = require('axios');

// 定义衍生词前缀
const PREFIXES = {
    questions: ['what', 'how', 'why', 'when', 'where', 'which', 'who', 'is', 'can', 'does'],
    prepositions: ['in', 'for', 'with', 'without', 'vs', 'versus', 'or', 'and', 'to', 'from'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    modifiers: ['best', 'top', 'free', 'online', 'cheap', 'easy', 'quick', 'simple']
};

// 核心逻辑
async function getSuggestions(keyword) {
    try {
        // 获取所有类型的建议
        const allSuggestions = {
            base: await getBingSuggestions(keyword),
            questions: [],
            prepositions: [],
            alphabet: [],
            modifiers: []
        };

        // 获取各类衍生词建议
        for (const [type, prefixes] of Object.entries(PREFIXES)) {
            const suggestions = await Promise.all(
                prefixes.map(prefix => 
                    type === 'alphabet' 
                        ? getBingSuggestions(`${keyword} ${prefix}`)
                        : getBingSuggestions(`${prefix} ${keyword}`)
                )
            );
            allSuggestions[type] = [...new Set(suggestions.flat())];
        }

        return {
            success: true,
            suggestions: allSuggestions.base,
            categorizedSuggestions: allSuggestions,
            query: keyword
        };
    } catch (error) {
        console.error('Error getting suggestions:', error);
        throw error;
    }
}

// Bing建议API
async function getBingSuggestions(keyword) {
    try {
        const response = await axios.get('https://api.bing.com/osjson.aspx', {
            params: {
                query: keyword,
                language: 'zh-CN'
            },
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        });
        return Array.isArray(response.data[1]) ? response.data[1] : [];
    } catch (error) {
        console.error('Bing API error:', error.message);
        return [];
    }
}

// 检查是否在 Vercel 环境
if (process.env.VERCEL) {
    // Vercel Serverless Function
    module.exports = async (req, res) => {
        try {
            // 设置 CORS
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (req.method === 'OPTIONS') {
                return res.status(200).end();
            }

            const { keyword } = req.query;
            
            if (!keyword) {
                return res.status(400).json({
                    success: false,
                    error: 'Keyword is required'
                });
            }

            const result = await getSuggestions(keyword);
            return res.status(200).json(result);

        } catch (error) {
            console.error('Function error:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
                message: error.message
            });
        }
    };
} else {
    // 本地开发环境
    const app = express();
    app.use(cors());
    app.use(express.json());

    // API 路由
    app.get('/api/suggestions', async (req, res) => {
        try {
            const { keyword } = req.query;
            
            if (!keyword) {
                return res.status(400).json({
                    success: false,
                    error: 'Keyword is required'
                });
            }

            const result = await getSuggestions(keyword);
            res.json(result);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                message: error.message
            });
        }
    });

    // 启动服务器
    const port = process.env.PORT || 3000;
    if (require.main === module) {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

    module.exports = app;
} 