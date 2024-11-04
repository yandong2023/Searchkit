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
            timeout: 10000
        });
        return response.data[1] || [];
    } catch (error) {
        console.error('Error in getBingSuggestions:', error);
        return [];
    }
}

export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

        res.json({
            success: true,
            categorizedSuggestions: categorizedResults,
            source: 'bing'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Failed to fetch suggestions',
            message: error.message
        });
    }
} 