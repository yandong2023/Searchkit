const express = require('express');
const router = express.Router();
const axios = require('axios');

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

router.post('/', async (req, res) => {
    const { keyword } = req.body;
    
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        console.log('Analyzing keyword:', keyword);
        console.log('Using API Key:', DEEPSEEK_API_KEY);

        const prompt = `分析以下关键词背后的用户需求和意图："${keyword}"

请从以下几个方面分析并以JSON格式返回：
{
    "intentType": "用户意图类型（信息查询/交易购买/导航访问）",
    "specificNeeds": ["具体需求1", "具体需求2", ...],
    "purchaseIntent": 购买意向强度（1-5的数字，如果不适用则为0）,
    "userStage": "用户所处阶段（了解/对比/决策）",
    "relatedNeeds": ["相关衍生需求1", "相关衍生需求2", ...]
}

注意：
1. 返回格式必须是合法的JSON
2. specificNeeds和relatedNeeds必须是数组
3. purchaseIntent必须是0-5之间的数字
4. 所有分析要简洁明了

请直接返回JSON，不要包含其他文字。`;

        const response = await axios.post(DEEPSEEK_API_URL, {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 800,
            response_format: { type: "json_object" }
        }, {
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });

        console.log('Deepseek API Response:', response.data);

        let analysis;
        try {
            const content = response.data.choices[0].message.content.trim();
            analysis = JSON.parse(content);

            // 验证数据格式
            if (!analysis.intentType) analysis.intentType = 'N/A';
            if (!Array.isArray(analysis.specificNeeds)) analysis.specificNeeds = [];
            if (typeof analysis.purchaseIntent !== 'number' || analysis.purchaseIntent < 0 || analysis.purchaseIntent > 5) {
                analysis.purchaseIntent = 0;
            }
            if (!analysis.userStage) analysis.userStage = 'N/A';
            if (!Array.isArray(analysis.relatedNeeds)) analysis.relatedNeeds = [];

        } catch (error) {
            console.error('Error parsing Deepseek response:', error);
            console.log('Raw response content:', response.data.choices[0].message.content);
            
            // 如果解析失败，返回一个默认的结构
            analysis = {
                intentType: '解析错误',
                specificNeeds: ['无法解析AI响应'],
                purchaseIntent: 0,
                userStage: 'N/A',
                relatedNeeds: [],
                error: 'Failed to parse AI response'
            };
        }

        res.json(analysis);
    } catch (error) {
        console.error('Error calling Deepseek API:', error.response?.data || error.message);
        
        // 返回一个带有错误信息的默认结构
        res.status(500).json({
            intentType: '服务错误',
            specificNeeds: ['API调用失败'],
            purchaseIntent: 0,
            userStage: 'N/A',
            relatedNeeds: [],
            error: error.response?.data?.error || error.message
        });
    }
});

module.exports = router;
