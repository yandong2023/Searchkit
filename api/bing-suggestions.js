const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                error: 'Keyword is required'
            });
        }

        // Make request to Bing API
        const response = await axios.get(`https://api.bing.com/osjson.aspx?query=${encodeURIComponent(keyword)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 5000
        });

        // Extract suggestions from Bing's response
        const suggestions = response.data[1] || [];

        res.json({
            success: true,
            suggestions
        });
    } catch (error) {
        console.error('Error fetching Bing suggestions:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            suggestions: []
        });
    }
});

module.exports = router;
