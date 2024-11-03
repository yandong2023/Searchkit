let currentLanguage = 'en';

// 语言切换函数
function changeLanguage(lang) {
    currentLanguage = lang;
    updateInterface();
    updateBackLink();
    
    // 更新 URL 参数但不刷新页面
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
}

// 更新界面文本
function updateInterface() {
    const translations = languages[currentLanguage].explorer;
    
    document.getElementById('explorerTitle').textContent = translations.title;
    document.getElementById('keywordInput').placeholder = translations.inputPlaceholder;
    document.getElementById('exploreButton').textContent = translations.exploreButton;
    document.getElementById('backLink').textContent = translations.backLink;
    
    // 如果有结果显示，重新显示结果
    const resultsDiv = document.getElementById('keywordResults');
    if (resultsDiv.innerHTML !== '') {
        displayCategorizedResults(lastResults);
    }
}

// 存储最后的结果以便语言切换时重新显示
let lastResults = null;

// 生成关键词变体
async function exploreKeywords() {
    const keyword = document.getElementById('keywordInput').value.trim();
    if (!keyword) return;

    const resultsDiv = document.getElementById('keywordResults');
    resultsDiv.innerHTML = '<div class="loading">Exploring keywords...</div>';

    try {
        const response = await fetch(`http://localhost:3000/api/suggestions?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();
        
        if (data.success && data.categorizedSuggestions) {
            displayCategorizedResults(data.categorizedSuggestions);
        } else {
            resultsDiv.innerHTML = '<div class="error">No suggestions found</div>';
        }
    } catch (error) {
        resultsDiv.innerHTML = '<div class="error">Failed to fetch suggestions</div>';
        console.error(error);
    }
}

// 显示分类结果
function displayCategorizedResults(categorizedSuggestions) {
    lastResults = categorizedSuggestions;
    const resultsDiv = document.getElementById('keywordResults');
    resultsDiv.innerHTML = '';
    
    const translations = languages[currentLanguage].explorer.categoryNames;

    Object.entries(categorizedSuggestions).forEach(([category, suggestions]) => {
        if (!suggestions || suggestions.length === 0) return;

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'keyword-category';
        categoryDiv.innerHTML = `
            <h3>${translations[category] || category}</h3>
            <div class="keyword-list">
                ${suggestions.map((keyword, index) => `
                    <div class="keyword-item">
                        <span class="keyword-number">${index + 1}.</span>
                        <a href="https://www.google.com/search?q=${encodeURIComponent(keyword)}" 
                           class="keyword-link" 
                           target="_blank"
                           title="Search for '${keyword}'">${keyword}</a>
                    </div>
                `).join('')}
            </div>
        `;
        resultsDiv.appendChild(categoryDiv);
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 从 URL 参数获取语言
    const urlParams = new URLSearchParams(window.location.search);
    currentLanguage = urlParams.get('lang') || navigator.language.split('-')[0] || 'en';
    
    // 设置语言选择器的初始值
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    // 更新界面
    updateInterface();
    
    // 更新返回链接
    updateBackLink();
});

// 添加回车键支持
document.getElementById('keywordInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        exploreKeywords();
    }
});

// 添加更新返回链接的函数
function updateBackLink() {
    const backLink = document.getElementById('backLink');
    if (backLink) {
        const baseUrl = currentLanguage === 'en' ? '/' : `/${currentLanguage}/`;
        backLink.href = baseUrl;
    }
}