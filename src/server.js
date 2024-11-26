require('dotenv').config();
const express = require('express');
const suggestions = require('./api/suggestions');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());

// 路由
app.get('/api/suggestions', suggestions);

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 