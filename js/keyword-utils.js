const axios = require('axios');

// 定义衍生词前缀
const PREFIXES = {
    questions: ['what', 'how', 'why', 'when', 'where', 'which', 'who', 'is', 'can', 'does'],
    prepositions: ['in', 'for', 'with', 'without', 'vs', 'versus', 'or', 'and', 'to', 'from'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    modifiers: ['best', 'top', 'free', 'online', 'cheap', 'easy', 'quick', 'simple']
};

// 热门修饰词权重
const MODIFIER_WEIGHTS = {
    'best': 0.9,       // 90% 的主词搜索量
    'how to': 0.85,    // 85% 的主词搜索量
    'top': 0.8,        // 80% 的主词搜索量
    'vs': 0.75,        // 75% 的主词搜索量
    'review': 0.7,     // 70% 的主词搜索量
    'price': 0.65,     // 65% 的主词搜索量
    'free': 0.6,       // 60% 的主词搜索量
    'online': 0.55,    // 55% 的主词搜索量
    'cheap': 0.5,      // 50% 的主词搜索量
    'guide': 0.45,     // 45% 的主词搜索量
    'tutorial': 0.4,   // 40% 的主词搜索量
    'easy': 0.35,      // 35% 的主词搜索量
    'quick': 0.3,      // 30% 的主词搜索量
    'simple': 0.25     // 25% 的主词搜索量
};

// 计算相对热度（1-5）
function calculateHeatLevel(score) {
    if (score >= 0.8) return 5;
    if (score >= 0.6) return 4;
    if (score >= 0.4) return 3;
    if (score >= 0.2) return 2;
    return 1;
}

// 估算搜索相对热度
function estimateSearchVolume(keyword, baseKeyword, position = 0, totalResults = 1) {
    // 如果是主关键词，返回最高热度
    if (keyword.toLowerCase() === baseKeyword.toLowerCase()) {
        return {
            score: 1.0,
            heatLevel: 5,
            isBaseKeyword: true
        };
    }

    let score = 1.0;
    const lowerKeyword = keyword.toLowerCase();
    const lowerBaseKeyword = baseKeyword.toLowerCase();

    // 1. 基于与主关键词的关系
    if (lowerKeyword.includes(lowerBaseKeyword)) {
        // 如果是主关键词的扩展（比如"手机壳"相对于"手机"）
        score *= 0.8;
    } else if (lowerBaseKeyword.includes(lowerKeyword)) {
        // 如果是主关键词的部分（比如"手"相对于"手机"）
        score *= 0.3;
    } else {
        // 完全不相关的词
        score *= 0.2;
    }

    // 2. 基于词的长度
    const wordCount = keyword.split(' ').length;
    const baseWordCount = baseKeyword.split(' ').length;
    if (wordCount > baseWordCount) {
        score *= Math.max(0.3, 1.0 - ((wordCount - baseWordCount) * 0.2));
    }

    // 3. 检查修饰词
    let hasModifier = false;
    Object.entries(MODIFIER_WEIGHTS).forEach(([modifier, weight]) => {
        if (lowerKeyword.includes(modifier)) {
            score *= weight;
            hasModifier = true;
        }
    });

    // 4. 基于位置的权重
    const positionWeight = Math.max(0.5, 1 - (position / totalResults) * 0.5);
    score *= positionWeight;

    // 5. 特殊词型处理
    if (lowerKeyword.startsWith('how to')) score *= 0.85;
    if (lowerKeyword.startsWith('what is')) score *= 0.8;
    if (lowerKeyword.includes('vs')) score *= 0.75;
    if (lowerKeyword.includes('tutorial')) score *= 0.7;

    // 6. 添加随机波动（±5%）
    const variation = (Math.random() * 0.1 - 0.05);
    score = Math.max(0.1, Math.min(1.0, score * (1 + variation)));

    return {
        score,
        heatLevel: calculateHeatLevel(score),
        isBaseKeyword: false
    };
}

// 从 Bing 获取建议
async function getBingSuggestions(keyword) {
    try {
        const response = await axios.get(`https://api.bing.com/osjson.aspx?query=${encodeURIComponent(keyword)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 5000
        });
        return response.data[1] || [];
    } catch (error) {
        console.error('Error fetching Bing suggestions:', error);
        return [];
    }
}

// 生成衍生关键词
function generateVariations(keyword) {
    const variations = new Set();
    const baseKeyword = keyword.toLowerCase().trim();

    // 添加问题形式
    PREFIXES.questions.forEach(prefix => {
        variations.add(`${prefix} ${baseKeyword}`);
    });

    // 添加介词形式
    PREFIXES.prepositions.forEach(prep => {
        variations.add(`${baseKeyword} ${prep}`);
        variations.add(`${prep} ${baseKeyword}`);
    });

    // 添加字母前缀
    PREFIXES.alphabet.forEach(letter => {
        variations.add(`${baseKeyword} ${letter}`);
    });

    // 添加修饰词
    PREFIXES.modifiers.forEach(modifier => {
        variations.add(`${modifier} ${baseKeyword}`);
        variations.add(`${baseKeyword} ${modifier}`);
    });

    return Array.from(variations);
}

// 对关键词建议进行分类
function categorizeSuggestions(suggestions) {
    const categorized = {
        questions: [],
        prepositions: [],
        alphabet: [],
        modifiers: [],
        others: []
    };

    suggestions.forEach(suggestion => {
        const lowerSuggestion = suggestion.toLowerCase();
        let matched = false;

        // 检查问题类
        if (PREFIXES.questions.some(prefix => lowerSuggestion.startsWith(prefix + ' '))) {
            categorized.questions.push(suggestion);
            matched = true;
        }

        // 检查介词类
        if (PREFIXES.prepositions.some(prep => 
            lowerSuggestion.includes(' ' + prep + ' ') || 
            lowerSuggestion.startsWith(prep + ' '))) {
            categorized.prepositions.push(suggestion);
            matched = true;
        }

        // 检查字母类
        if (PREFIXES.alphabet.some(letter => 
            lowerSuggestion.endsWith(' ' + letter))) {
            categorized.alphabet.push(suggestion);
            matched = true;
        }

        // 检查修饰词类
        if (PREFIXES.modifiers.some(modifier => 
            lowerSuggestion.includes(modifier))) {
            categorized.modifiers.push(suggestion);
            matched = true;
        }

        // 其他类
        if (!matched) {
            categorized.others.push(suggestion);
        }
    });

    return categorized;
}

// 获取所有建议
async function getAllSuggestions(keyword) {
    try {
        // 获取 Bing 建议
        console.log('Fetching Bing suggestions for:', keyword);
        const bingSuggestions = await getBingSuggestions(keyword);
        console.log('Received Bing suggestions:', bingSuggestions);

        // 生成变体
        console.log('Generating variations for:', keyword);
        const variations = generateVariations(keyword);
        console.log('Generated variations:', variations);

        // 合并建议
        const allSuggestions = [...new Set([...bingSuggestions, ...variations])];
        console.log('Combined suggestions:', allSuggestions);

        // 分类建议并添加热度估算
        console.log('Categorizing suggestions');
        const categorizedSuggestions = {};
        const rawCategorized = categorizeSuggestions(allSuggestions);

        // 为每个类别添加热度估算
        Object.entries(rawCategorized).forEach(([category, suggestions]) => {
            categorizedSuggestions[category] = suggestions.map((suggestion, index) => ({
                keyword: suggestion,
                heat: estimateSearchVolume(
                    suggestion,
                    keyword,    // 使用用户输入的关键词作为基准
                    index,
                    suggestions.length
                )
            }));
        });

        console.log('Categorized suggestions with heat levels:', categorizedSuggestions);

        return {
            success: true,
            categorizedSuggestions
        };
    } catch (error) {
        console.error('Error in getAllSuggestions:', error);
        return {
            success: false,
            error: error.message,
            categorizedSuggestions: categorizeSuggestions(generateVariations(keyword))
        };
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PREFIXES,
        generateVariations,
        categorizeSuggestions,
        getBingSuggestions,
        getAllSuggestions,
        estimateSearchVolume
    };
}
