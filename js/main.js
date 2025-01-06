// 获取当前语言代码
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// 初始化变量
const currentLanguage = getCurrentLanguage();

// 更新界面文本
function updateInterface() {
    const lang = languages[currentLanguage];
    document.title = lang.title;
    document.getElementById('explorerTitle').textContent = lang.title;
    document.getElementById('keywordInput').placeholder = lang.inputPlaceholder;
    document.getElementById('exploreButton').textContent = lang.exploreButton;
}

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
        
        // 按热度排序
        suggestions.sort((a, b) => b.heat.score - a.heat.score);

        suggestions.forEach(suggestion => {
            const item = document.createElement('li');
            item.className = 'suggestion-item';

            // 创建链接容器
            const linkContainer = document.createElement('div');
            linkContainer.className = 'suggestion-content';

            // 创建链接
            const link = document.createElement('a');
            link.href = createGoogleSearchUrl(suggestion.keyword);
            link.textContent = suggestion.keyword;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'suggestion-link';

            // 创建热度标签
            const heatLabel = document.createElement('span');
            heatLabel.className = `search-volume heat-level-${suggestion.heat.heatLevel}`;
            heatLabel.textContent = generateHeatIcons(suggestion.heat.heatLevel);
            heatLabel.title = `相对热度：${suggestion.heat.heatLevel}/5`;

            // 添加点击事件
            link.addEventListener('click', (e) => {
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    window.open(link.href, '_blank');
                }
            });

            // 组装元素
            linkContainer.appendChild(link);
            linkContainer.appendChild(heatLabel);
            item.appendChild(linkContainer);
            suggestionsList.appendChild(item);
        });

        categoryDiv.appendChild(suggestionsList);
        resultsDiv.appendChild(categoryDiv);
    });

    if (resultsDiv.children.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">No suggestions found</p>';
    }
}

// 语言切换函数
function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

// 添加事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 初始化界面
    updateInterface();
    
    // 设置语言选择事件
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    }
    
    // 设置回车键搜索
    const keywordInput = document.getElementById('keywordInput');
    keywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            exploreKeywords();
        }
    });
});