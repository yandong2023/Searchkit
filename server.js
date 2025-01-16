require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

// 导入路由
const bingSuggestionsRouter = require('./api/bing-suggestions');
const analyzeRouter = require('./api/analyze');
const deepseekAnalysisRouter = require('./api/deepseek-analysis');

const app = express();
const port = process.env.PORT || 3000;

// 启用 CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
}));

// 解析 JSON 请求体
app.use(express.json());

// API 路由处理
app.use('/api/bing-suggestions', (req, res, next) => {
    console.log('Bing API Request:', req.method, req.path, req.query);
    next();
}, bingSuggestionsRouter);

app.use('/api/analyze', (req, res, next) => {
    console.log('Analyze API Request:', req.method, req.path, req.query);
    next();
}, analyzeRouter);

app.use('/api/deepseek-analysis', (req, res, next) => {
    console.log('Deepseek Analysis Request:', req.method, req.path, req.body);
    next();
}, deepseekAnalysisRouter);

// 静态文件处理
app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'API endpoint not found' });
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        details: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
