async function analyzeBacklinks(url) {
  try {
    const results = await Promise.all([
      // 使用Google搜索语法
      getGoogleBacklinks(url),
      // 使用免费API
      getWebDataAPI(url),
      getBingBacklinks(url)
    ]);
    
    return aggregateResults(results);
  } catch (error) {
    console.error('外链分析出错:', error);
    throw error;
  }
}

async function getGoogleBacklinks(url) {
  const googleQueries = [
    `link:${url}`,
    `"${url}" -site:${new URL(url).hostname}`,
    `inanchor:"${url}"`,
    `intext:"${url}" -site:${new URL(url).hostname}`
  ];
  
  const results = [];
  for (const query of googleQueries) {
    // 使用 serpapi 的免费配额或自己抓取 Google 搜索结果
    const searchResults = await searchGoogle(query);
    results.push(...searchResults);
  }
  return results;
}

async function getWebDataAPI(url) {
  // 使用一些免费的API服务
  // 例如：https://www.webdataapi.com/ 的免费配额
  const response = await axios.get(`https://api.webdataapi.com/v1/backlinks`, {
    params: {
      url: url,
      apikey: process.env.WEBDATA_API_KEY
    }
  });
  return response.data;
}

async function getBingBacklinks(url) {
  // 使用Bing的搜索API（每月有免费配额）
  const query = `link:${url}`;
  const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
    },
    params: {
      q: query,
      count: 50
    }
  });
  return response.data.webPages?.value || [];
}

function aggregateResults(results) {
  // 去重和整合结果
  const uniqueBacklinks = new Set();
  const backlinkDetails = [];
  
  results.flat().forEach(result => {
    if (!uniqueBacklinks.has(result.url)) {
      uniqueBacklinks.add(result.url);
      backlinkDetails.push({
        url: result.url,
        title: result.title,
        snippet: result.snippet
      });
    }
  });
  
  return {
    totalBacklinks: uniqueBacklinks.size,
    backlinks: backlinkDetails,
    lastUpdated: new Date().toISOString()
  };
} 