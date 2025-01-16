const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

// 获取网站的WHOIS信息
async function getWhoisData(domain) {
    try {
        // 移除www.前缀
        const cleanDomain = domain.replace(/^www\./, '');
        const response = await axios.get(`http://whois.arin.net/rest/nets;q=${cleanDomain}/pft`, {
            timeout: 5000,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.data && response.data.nets && response.data.nets.net) {
            const netInfo = response.data.nets.net[0];
            return {
                registrar: netInfo.orgRef?.name || 'N/A',
                creationDate: netInfo.registrationDate || null,
                expirationDate: null // ARIN API不提供过期日期
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching WHOIS data:', error);
        return null;
    }
}

// 从URL中提取域名
function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch (error) {
        console.error('Error extracting domain:', error);
        return null;
    }
}

router.get('/', async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({ error: 'Keyword parameter is required' });
        }

        // 移除多余空格并编码关键词
        const encodedKeyword = encodeURIComponent(keyword.trim());
        
        // 使用Bing搜索API获取结果
        const searchUrl = `https://www.bing.com/search?q=${encodedKeyword}&count=10&responseFilter=Webpages`;
        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);
        const websites = [];

        // 解析搜索结果
        $('.b_algo').each((i, element) => {
            const titleElement = $(element).find('h2 a');
            const title = titleElement.text().trim();
            const url = titleElement.attr('href');
            const description = $(element).find('.b_caption p').text().trim();

            if (title && url) {
                websites.push({
                    title,
                    url,
                    description,
                    whoisData: null // 初始化WHOIS数据为null
                });
            }
        });

        // 并行获取所有网站的WHOIS信息
        const websitesWithWhois = await Promise.all(
            websites.map(async (website) => {
                const domain = extractDomain(website.url);
                if (domain) {
                    website.whoisData = await getWhoisData(domain);
                }
                return website;
            })
        );

        res.json({ websites: websitesWithWhois });
    } catch (error) {
        console.error('Error analyzing keyword:', error);
        res.status(500).json({ error: 'Failed to analyze keyword' });
    }
});

module.exports = router;
