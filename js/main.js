// 获取当前语言代码
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path === '/index') return 'en';
    const lang = path.split('/')[1];
    return lang || 'en';
}

// 初始化变量
const currentLanguage = getCurrentLanguage();
const searchInput = document.getElementById('searchInput');
const searchEngineSelect = document.getElementById('searchEngineSelect');
const toolsArea = document.getElementById('toolsArea');
const tipArea = document.getElementById('tipArea');

// 更新界面文本
function updateInterface() {
    document.getElementById('title').textContent = languages[currentLanguage].title;
    searchInput.placeholder = languages[currentLanguage].searchPlaceholder;
    document.getElementById('searchButton').textContent = languages[currentLanguage].searchButton;
    updateTip(languages[currentLanguage].defaultTip);
    createToolButtons();
    updateToolsForUserType();
}

// 创建工具按钮
function createToolButtons() {
    toolsArea.innerHTML = searchTools
        .filter(tool => languages[currentLanguage].tools[tool.name])
        .map(tool => 
            `<button class="tool-button" onclick="applyTool('${tool.name}')" 
             title="${languages[currentLanguage].tools[tool.name].description}">${languages[currentLanguage].tools[tool.name].name}</button>`
        ).join('');
}

// 应用搜索工具
function applyTool(toolName) {
    const tool = searchTools.find(t => t.name === toolName);
    if (tool && languages[currentLanguage].tools[toolName]) {
        let currentValue = searchInput.value.trim();
        
        // 处理前缀 - 移除了需要空格的数组，确保所有操作符后直接连接值
        if (tool.prefix && !currentValue.startsWith(tool.prefix)) {
            currentValue = tool.prefix + currentValue;
        }
        
        // 处理后缀
        if (tool.suffix && !currentValue.endsWith(tool.suffix)) {
            currentValue += tool.suffix;
        }
        
        // 处理中缀
        if (tool.infix && !currentValue.includes(tool.infix)) {
            currentValue += tool.infix;
        }
        
        // 清理搜索字符串中的多余空格
        currentValue = currentValue.replace(/(\w+):\s+/g, '$1:');
        
        searchInput.value = currentValue;
        searchInput.focus();
        
        // 更新提示
        let tipText = languages[currentLanguage].tools[toolName].description;
        if (languages[currentLanguage].tools[toolName].suggestion) {
            tipText += "<br><br>" + languages[currentLanguage].tools[toolName].suggestion;
        }
        updateTip(tipText);
    }
}

// 更新提示文本
function updateTip(description) {
    tipArea.innerHTML = `${languages[currentLanguage].tipPrefix}${description}`;
}

// 执行搜索前清理搜索字符串
function performSearch() {
    // 清理搜索字符串中的多余空格
    const cleanedQuery = searchInput.value.replace(/(\w+):\s+/g, '$1:');
    const query = encodeURIComponent(cleanedQuery);
    const searchEngine = searchEngineSelect.value;
    let searchUrl;

    switch(searchEngine) {
        case 'bing':
            searchUrl = `https://www.bing.com/search?q=${query}`;
            break;
        case 'baidu':
            searchUrl = `https://www.baidu.com/s?wd=${query}`;
            break;
        default:
            searchUrl = `https://www.google.com/search?q=${query}`;
    }

    window.open(searchUrl, '_blank');
}

// 根据用户类型更新工具
function updateToolsForUserType() {
    const userType = document.getElementById('userTypeSelect').value;
    const tools = getToolsForUserType(userType);
    createToolButtonsForUserType(tools);
}

// 获取用户类型对应的工具
function getToolsForUserType(userType) {
    // 所有用户都可以使用的基础工具
    const commonTools = [
        "exactMatch", "exclude", "siteSearch", "fileType", "orSearch", 
        "similarSites", "iconSearch", "youtubeDownload", "demandSearch"
    ];
    
    const toolMap = {
        // 普通用户 - 可以使用所有工具
        general: [
            ...commonTools,
            "urlSearch", "relatedSites", "cache", "numberRange", "define",
            "calculator", "scholarSearch", "newsSearch", "imageSearch",
            "patentSearch", "trendSearch", "citationSearch", "hashtagSearch",
            "locationSearch", "timeRangeSearch", "similarSites", "commonCrawl",
            "iconSearch", "youtubeDownload", "demandSearch"
        ],
        
        // 学术研究者
        researcher: [
            ...commonTools,
            "scholarSearch", "citationSearch", "timeRangeSearch", "define",
            "patentSearch", "similarSites", "iconSearch", "youtubeDownload",
            "demandSearch"
        ],
        
        // 数据分析师
        dataAnalyst: [
            ...commonTools,
            "numberRange", "calculator", "trendSearch", "imageSearch",
            "locationSearch", "similarSites", "iconSearch", "youtubeDownload",
            "demandSearch"
        ],
        
        // 调查记者
        investigativeJournalist: [
            ...commonTools,
            "newsSearch", "cache", "relatedSites", "timeRangeSearch",
            "urlSearch", "similarSites", "iconSearch", "youtubeDownload",
            "demandSearch"
        ],
        
        // 市场研究员
        marketResearcher: [
            ...commonTools,
            "trendSearch", "newsSearch", "locationSearch", "hashtagSearch",
            "imageSearch", "similarSites", "iconSearch", "youtubeDownload",
            "demandSearch"
        ],
        
        // 法律专业人士
        legalProfessional: [
            ...commonTools,
            "scholarSearch", "citationSearch", "define", "cache",
            "timeRangeSearch", "similarSites", "iconSearch", "youtubeDownload",
            "demandSearch"
        ]
    };
    
    return toolMap[userType] || commonTools;
}

// 为用户类型创建工具按钮
function createToolButtonsForUserType(tools) {
    toolsArea.innerHTML = tools
        .filter(toolName => languages[currentLanguage].tools && languages[currentLanguage].tools[toolName])
        .map(toolName => {
            const tool = languages[currentLanguage].tools[toolName];
            return `<button class="tool-button" onclick="applyTool('${toolName}')" 
                    title="${tool.description}">${tool.name}</button>`;
        }).join('');
}

// 添加事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 初始化界面
    updateInterface();
    
    // 搜索框输入事件
    searchInput.addEventListener('input', () => {
        updateTip(languages[currentLanguage].defaultTip);
    });
    
    // 回车键搜索
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});

// 在处理搜索操作符时，确保冒号后没有空格
function formatSearchOperator(operator, value) {
    return `${operator}:${value.trim()}`; // 移除值前后的空格，确保冒号后直接连接值
}

// 当处理 site: 等操作符时
function buildSearchQuery(searchTerm) {
    // 示例：将 "site: searchkit.cc" 转换为 "site:searchkit.cc"
    return searchTerm.replace(/(\w+):\s+/g, '$1:');
}
