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
    allowedHeaders: ['Content-Type']
}));

// 解析 JSON 请求体
app.use(express.json());

// 提供静态文件服务
app.use(express.static(path.join(__dirname)));

// 处理语言路由
const languages = ['zh', 'ja', 'ko', 'es', 'de', 'fr'];
languages.forEach(lang => {
    app.get(`/${lang}/*`, (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
});

// 处理根路由和其他所有路由
app.get('*', (req, res) => {
    // 如果是 favicon.ico 请求
    if (req.path === '/favicon.ico') {
        return res.sendFile(path.join(__dirname, 'favicon.ico'));
    }
    // 其他所有路由返回 index.html
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 使用建议路由
app.use('/api/suggestions', suggestionsRouter);
app.use('/api/suggestions/bing', bingSuggestionsRouter);

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
