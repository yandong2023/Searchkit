const axios = require('axios');

// 简单的 Bing 建议 API
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

// Vercel Serverless Function
module.exports = async (req, res) => {
    // 添加错误处理
    try {
        // 设置 CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // 处理预检请求
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        const { keyword } = req.query;
        
        // 验证关键词
        if (!keyword) {
            return res.status(400).json({
                success: false,
                error: 'Keyword is required'
            });
        }

        // 获取建议
        const suggestions = await getBingSuggestions(keyword);
        
        // 返回结果
        return res.status(200).json({
            success: true,
            suggestions,
            query: keyword
        });

    } catch (error) {
        // 错误日志
        console.error('Function error:', error);
        
        // 返回错误信息
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message || 'Unknown error'
        });
    }
}; 