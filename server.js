const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// 启用 CORS
app.use(cors());

// 提供静态文件服务
app.use(express.static(__dirname));

// 处理语言路由
const languages = ['zh', 'ja', 'ko', 'es', 'de', 'fr'];
languages.forEach(lang => {
    // 处理主页的语言版本
    app.get(`/${lang}/`, (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
    
    // 处理 YouTube 下载页面的语言版本
    app.get(`/${lang}/youtube-download.html`, (req, res) => {
        res.sendFile(path.join(__dirname, 'youtube-download.html'));
    });
});

// 处理根路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 处理 YouTube 下载页面路由
app.get('/youtube-download.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'youtube-download.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
