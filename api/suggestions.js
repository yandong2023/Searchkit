const express = require('express');
const router = express.Router();
const { getAllSuggestions } = require('../js/keyword-utils');

// 获取关键词建议
router.get('/', async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                error: 'Keyword is required'
            });
        }

        const result = await getAllSuggestions(keyword);
        res.json(result);
    } catch (error) {
        console.error('Error in suggestions route:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
