const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || typeof q !== 'string') {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        // 构建Bing建议API的URL
        const bingUrl = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(q)}`;
        
        const response = await axios.get(bingUrl);
        
        // Bing API返回的是一个数组，第二个元素包含建议词
        const suggestions = response.data[1] || [];
        
        // 限制返回的建议数量
        const limitedSuggestions = suggestions.slice(0, 10);
        
        res.json(limitedSuggestions);
    } catch (error) {
        console.error('Error fetching Bing suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch suggestions' });
    }
});

module.exports = router;
