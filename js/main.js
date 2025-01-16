// 创建谷歌搜索链接
function createGoogleSearchUrl(keyword) {
    return `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
}

// 生成热度图标
function generateHeatIcons(heatLevel) {
    const fullStar = '';
    const emptyStar = '';
    return (fullStar.repeat(heatLevel) + emptyStar.repeat(5 - heatLevel));
}

// 探索关键词
async function exploreKeywords() {
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value.trim();
    const resultsDiv = document.getElementById('keywordResults');
    
    if (!keyword) {
        resultsDiv.innerHTML = '<p class="error">Please enter a keyword</p>';
        return;
    }

    resultsDiv.innerHTML = '<p class="loading">Exploring keywords...</p>';
    
    try {
        const response = await fetch(`/api/suggestions?keyword=${encodeURIComponent(keyword)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        if (data && data.categorizedSuggestions) {
            displayCategorizedResults(data.categorizedSuggestions);
        } else {
            console.error('Invalid response format:', data);
            resultsDiv.innerHTML = '<p class="error">No suggestions found</p>';
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        resultsDiv.innerHTML = '<p class="error">Failed to fetch suggestions. Please try again.</p>';
    }
}

// 显示分类结果
function displayCategorizedResults(categorizedSuggestions) {
    const resultsDiv = document.getElementById('keywordResults');
    resultsDiv.innerHTML = '';

    const categories = {
        questions: '问题类',
        prepositions: '介词类',
        alphabet: '字母类',
        modifiers: '修饰类',
        others: '其他'
    };

    // 为每个类别创建一个部分
    Object.entries(categorizedSuggestions).forEach(([category, suggestions]) => {
        if (suggestions.length === 0) return;

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'keyword-category';
        
        // 添加类别标题
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = categories[category] || category;
        categoryDiv.appendChild(categoryTitle);

        // 添加建议列表
        const suggestionsList = document.createElement('ul');
        suggestionsList.className = 'suggestions-list';
        
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            
            const link = document.createElement('a');
            link.href = createGoogleSearchUrl(suggestion.keyword);
            link.target = '_blank';
            link.textContent = suggestion.keyword;
            
            const heatSpan = document.createElement('span');
            heatSpan.className = 'heat-level';
            heatSpan.innerHTML = generateHeatIcons(suggestion.heat || 0);
            
            li.appendChild(link);
            li.appendChild(heatSpan);
            suggestionsList.appendChild(li);
        });
        
        categoryDiv.appendChild(suggestionsList);
        resultsDiv.appendChild(categoryDiv);
    });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 获取Bing联想词
async function getBingSuggestions(query) {
    if (!query) {
        document.getElementById('suggestions').style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`/api/bing-suggestions?q=${encodeURIComponent(query.trim())}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }
        const suggestions = await response.json();
        displaySuggestions(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        document.getElementById('suggestions').style.display = 'none';
    }
}

// 显示联想词
function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    
    if (!suggestions || suggestions.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    const suggestionsHtml = suggestions.map(suggestion => 
        `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`
    ).join('');

    suggestionsDiv.innerHTML = suggestionsHtml;
    suggestionsDiv.style.display = 'block';
}

// 选择联想词
async function selectSuggestion(suggestion) {
    const input = document.getElementById('keywordInput');
    input.value = suggestion;
    document.getElementById('suggestions').style.display = 'none';
    await analyzeKeywordFull(suggestion);
}

// 完整的关键词分析
async function analyzeKeywordFull(keyword) {
    // 显示加载状态
    document.getElementById('websiteAnalysis').innerHTML = '<div class="loading">Analyzing websites...</div>';
    document.getElementById('intentAnalysis').innerHTML = '<div class="loading">Analyzing user intent...</div>';

    try {
        // 并行执行网站分析和意图分析
        await Promise.all([
            analyzeKeyword(keyword),
            analyzeIntent(keyword)
        ]);
    } catch (error) {
        console.error('Error in full analysis:', error);
    }
}

// 分析关键词（网站分析）
async function analyzeKeyword(keyword) {
    try {
        const response = await fetch(`/api/analyze?keyword=${encodeURIComponent(keyword.trim())}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }
        const data = await response.json();
        displayWebsiteAnalysis(data);
    } catch (error) {
        console.error('Error analyzing keyword:', error);
        document.getElementById('websiteAnalysis').innerHTML = 
            '<div class="error">Failed to analyze websites. Please try again.</div>';
    }
}

// 分析用户意图
async function analyzeIntent(keyword) {
    try {
        console.log('Analyzing intent for keyword:', keyword);
        const response = await fetch('/api/deepseek-analysis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Deepseek API error:', errorData);
            throw new Error(errorData.error || 'Failed to analyze intent');
        }

        const data = await response.json();
        console.log('Intent analysis result:', data);
        displayIntentAnalysis(data);
    } catch (error) {
        console.error('Error analyzing intent:', error);
        displayIntentAnalysis({
            intentType: 'Error: ' + error.message,
            specificNeeds: [],
            purchaseIntent: 0,
            userStage: 'N/A',
            relatedNeeds: []
        });
    }
}

// 显示网站分析结果
function displayWebsiteAnalysis(data) {
    const websiteDiv = document.getElementById('websiteAnalysis');
    
    if (!data || !data.websites || !Array.isArray(data.websites)) {
        websiteDiv.innerHTML = '<div class="error">No website data available</div>';
        return;
    }

    const websitesHtml = data.websites.map(website => {
        // 格式化域名年龄
        let domainAge = 'N/A';
        if (website.whoisData && website.whoisData.creationDate) {
            try {
                const created = new Date(website.whoisData.creationDate);
                const now = new Date();
                const ageInYears = ((now - created) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);
                if (!isNaN(ageInYears) && ageInYears > 0) {
                    domainAge = ageInYears + ' years';
                }
            } catch (e) {
                console.error('Error calculating domain age:', e);
            }
        }

        // 格式化注册日期
        let registrationDate = 'N/A';
        if (website.whoisData && website.whoisData.creationDate) {
            try {
                const date = new Date(website.whoisData.creationDate);
                if (!isNaN(date.getTime())) {
                    registrationDate = date.toLocaleDateString();
                }
            } catch (e) {
                console.error('Error formatting registration date:', e);
            }
        }

        return `
            <div class="website-item">
                <h3><a href="${website.url}" target="_blank">${website.title}</a></h3>
                <p class="url">${website.url}</p>
                <p class="description">${website.description || 'No description available'}</p>
                <div class="website-stats">
                    <div class="stat-item">
                        <span class="stat-label">Monthly Traffic:</span>
                        <span class="stat-value">N/A</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Domain Age:</span>
                        <span class="stat-value">${domainAge}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Registered:</span>
                        <span class="stat-value">${registrationDate}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    websiteDiv.innerHTML = websitesHtml || '<div class="error">No websites found</div>';
}

// 显示意图分析结果
function displayIntentAnalysis(data) {
    const intentDiv = document.getElementById('intentAnalysis');
    
    if (!data || typeof data !== 'object') {
        intentDiv.innerHTML = '<div class="error">Invalid response from intent analysis</div>';
        return;
    }

    const {
        intentType = 'N/A',
        specificNeeds = [],
        purchaseIntent = 0,
        userStage = 'N/A',
        relatedNeeds = []
    } = data;

    const safeSpecificNeeds = Array.isArray(specificNeeds) ? specificNeeds : [];
    const safeRelatedNeeds = Array.isArray(relatedNeeds) ? relatedNeeds : [];
    
    const intentHtml = `
        <div class="intent-section">
            <h3>用户意图</h3>
            <div class="intent-type">${intentType}</div>
        </div>
        
        <div class="intent-section">
            <h3>具体需求</h3>
            <ul class="needs-list">
                ${safeSpecificNeeds.length > 0 
                    ? safeSpecificNeeds.map(need => `<li>${need}</li>`).join('')
                    : '<li>No specific needs found</li>'}
            </ul>
        </div>
        
        ${purchaseIntent > 0 ? `
        <div class="intent-section">
            <h3>购买意向强度</h3>
            <div class="purchase-intent">
                ${'★'.repeat(purchaseIntent)}${'☆'.repeat(5-purchaseIntent)}
            </div>
        </div>
        ` : ''}
        
        <div class="intent-section">
            <h3>用户阶段</h3>
            <div>${userStage}</div>
        </div>
        
        <div class="intent-section">
            <h3>相关衍生需求</h3>
            <ul class="needs-list">
                ${safeRelatedNeeds.length > 0
                    ? safeRelatedNeeds.map(need => `<li>${need}</li>`).join('')
                    : '<li>No related needs found</li>'}
            </ul>
        </div>
    `;
    
    intentDiv.innerHTML = intentHtml;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('keywordInput');
    const debouncedSearch = debounce(getBingSuggestions, 300);

    // 监听输入变化
    input.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    // 监听点击事件，关闭建议框
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#keywordInput') && !e.target.closest('#suggestions')) {
            document.getElementById('suggestions').style.display = 'none';
        }
    });

    // 监听回车键
    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            document.getElementById('suggestions').style.display = 'none';
            await analyzeKeywordFull(e.target.value);
        }
    });
});