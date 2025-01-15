const express = require('express');
const path = require('path');
const cors = require('cors');

// 导入路由
const suggestionsRouter = require('./api/suggestions');
const bingSuggestionsRouter = require('./api/bing-suggestions');

// 导入工具函数
let keywordUtils;
try {
    keywordUtils = require('./js/keyword-utils');
    console.log('Successfully loaded keyword-utils:', Object.keys(keywordUtils));
} catch (error) {
    console.error('Error loading keyword-utils:', error);
    process.exit(1);
}

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
app.use('/api/suggestions', (req, res, next) => {
    console.log('API Request:', req.method, req.path, req.query);
    next();
}, suggestionsRouter);

app.use('/api/suggestions/bing', (req, res, next) => {
    console.log('Bing API Request:', req.method, req.path, req.query);
    next();
}, bingSuggestionsRouter);

// 静态文件处理
if (process.env.VERCEL) {
    // Vercel 环境下的静态文件处理
    app.use(express.static(path.join(__dirname)));
    
    // API 路由之后的所有请求都返回 index.html
    app.get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
            res.status(404).json({ error: 'API endpoint not found' });
        } else {
            res.sendFile(path.join(__dirname, 'index.html'));
        }
    });
} else {
    // 本地环境下的静态文件处理
    app.use(express.static(path.join(__dirname)));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
}

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

// 优雅地处理服务器关闭
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
