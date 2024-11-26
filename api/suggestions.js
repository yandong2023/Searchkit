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

// 定义常用前缀和修饰词
const prefixes = {
    questions: ['what', 'how', 'why', 'when', 'where', 'which', 'who', 'is', 'can', 'does'],
    prepositions: ['in', 'for', 'with', 'without', 'vs', 'versus', 'or', 'and', 'to', 'from'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    modifiers: ['best', 'top', 'free', 'online', 'cheap', 'easy', 'quick', 'simple', 'professional', 'alternative']
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

// 增强的 Bing 建议 API
async function getEnhancedSuggestions(keyword) {
    try {
        const suggestions = {
            base: [],           // 原始建议
            questions: [],      // 问题形式
            prepositions: [],   // 介词形式
            alphabet: [],       // 字母前缀
            modifiers: []       // 修饰词
        };

        // 获取基础建议
        suggestions.base = await getBingSuggestions(keyword);

        // 获取问题形式建议
        const questionPromises = prefixes.questions.map(prefix => 
            getBingSuggestions(`${prefix} ${keyword}`)
        );
        const questionResults = await Promise.allSettled(questionPromises);
        suggestions.questions = questionResults
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value);

        // 获取介词形式建议
        const prepPromises = prefixes.prepositions.map(prefix =>
            getBingSuggestions(`${keyword} ${prefix}`)
        );
        const prepResults = await Promise.allSettled(prepPromises);
        suggestions.prepositions = prepResults
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value);

        // 获取字母前缀建议
        const alphabetPromises = prefixes.alphabet.map(letter =>
            getBingSuggestions(`${keyword} ${letter}`)
        );
        const alphabetResults = await Promise.allSettled(alphabetPromises);
        suggestions.alphabet = alphabetResults
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value);

        // 获取修饰词建议
        const modifierPromises = prefixes.modifiers.map(modifier =>
            getBingSuggestions(`${modifier} ${keyword}`)
        );
        const modifierResults = await Promise.allSettled(modifierPromises);
        suggestions.modifiers = modifierResults
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value);

        return suggestions;
    } catch (error) {
        console.error('Error in getEnhancedSuggestions:', error);
        return {};
    }
}

// 修改主处理函数
module.exports = async (req, res) => {
    try {
        // 设置 CORS 头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // 处理 OPTIONS 请求
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

        // 只获取基础建议，简化逻辑
        const suggestions = await getBingSuggestions(keyword);
        
        return res.status(200).json({
            success: true,
            categorizedSuggestions: {
                base: suggestions
            },
            source: 'bing'
        });

    } catch (error) {
        console.error('Server error:', error);
        
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message || 'Unknown error'
        });
    }
}; 