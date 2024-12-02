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
        .map(tool => {
            let className = 'tool-button';
            if (tool.name === 'youtubeDownload') {
                className += ' youtube-download';
            }
            
            return `<button class="${className}" 
                    onclick="applyTool('${tool.name}')" 
                    title="${languages[currentLanguage].tools[tool.name].description}">
                        ${languages[currentLanguage].tools[tool.name].name}
                    </button>`;
        }).join('');
}

// 应用搜索工具
function applyTool(toolName) {
    if (toolName === 'youtubeDownload') {
        // 获取当前输入的 URL
        const currentText = searchInput.value.trim();
        // 如果输入框有YouTube URL，直接跳转到9xbuddy
        if (currentText && (currentText.includes('youtube.com/watch?v=') || currentText.includes('youtu.be/'))) {
            window.location.href = `https://9xbuddy.in/process?url=${encodeURIComponent(currentText)}`;
        } else {
            // 否则跳转到下载页面
            window.location.href = `youtube-download.html?lang=${currentLanguage}`;
        }
        return;
    }

    const tool = searchTools.find(t => t.name === toolName);
    if (tool && languages[currentLanguage].tools[toolName]) {
        let currentValue = searchInput.value.trim();
        
        // 处理前缀
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
            "demandSearch", "keywordExplorer"
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
    
    // 设置语言选择器的初始值
    const currentLang = getCurrentLanguage();
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLang;
    }
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

// 在现有代中添加语言切换函数
function changeLanguage(lang) {
    // 根据选择的语言重定向到相应的页面
    const currentPath = window.location.pathname;
    const newPath = lang === 'en' ? '/' : `/${lang}/`;
    
    if (currentPath !== newPath) {
        window.location.href = newPath;
    }
}

// 在现有代码中添加文件类型配置
const FILE_TYPES = {
    document: {
        name: 'Documents',
        types: [
            { ext: 'pdf', icon: '📄', name: 'PDF' },
            { ext: 'doc,docx', icon: '📝', name: 'Word' },
            { ext: 'xls,xlsx', icon: '📊', name: 'Excel' },
            { ext: 'ppt,pptx', icon: '📽️', name: 'PowerPoint' },
            { ext: 'txt', icon: '📋', name: 'Text' }
        ]
    },
    media: {
        name: 'Media',
        types: [
            { ext: 'jpg,jpeg', icon: '🖼️', name: 'JPEG' },
            { ext: 'png', icon: '🖼️', name: 'PNG' },
            { ext: 'gif', icon: '🎞️', name: 'GIF' },
            { ext: 'mp4', icon: '🎥', name: 'MP4' },
            { ext: 'mp3', icon: '🎵', name: 'MP3' }
        ]
    },
    code: {
        name: 'Code',
        types: [
            { ext: 'html,htm', icon: '🌐', name: 'HTML' },
            { ext: 'css', icon: '🎨', name: 'CSS' },
            { ext: 'js', icon: '⚡', name: 'JavaScript' },
            { ext: 'py', icon: '🐍', name: 'Python' },
            { ext: 'java', icon: '☕', name: 'Java' }
        ]
    }
};

// 添加文件类型选择器的显示函数
function showFileTypeSelector() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'file-type-modal';
    
    // 创建模态框内容
    modal.innerHTML = `
        <div class="file-type-content">
            <div class="file-type-header">
                <h3>${languages[currentLanguage].tools.fileType.name}</h3>
                <button class="close-button" onclick="closeFileTypeModal()">×</button>
            </div>
            <div class="file-type-body">
                ${Object.entries(FILE_TYPES).map(([category, data]) => `
                    <div class="file-type-category">
                        <h4>${data.name}</h4>
                        <div class="file-type-grid">
                            ${data.types.map(type => `
                                <button class="file-type-button" onclick="selectFileType('${type.ext}')">
                                    <span class="file-type-icon">${type.icon}</span>
                                    <span class="file-type-name">${type.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加点击外部关闭功能
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeFileTypeModal();
        }
    });
}

// 关闭文件类型选择器
function closeFileTypeModal() {
    const modal = document.querySelector('.file-type-modal');
    if (modal) {
        modal.remove();
    }
}

// 选择文件类型
function selectFileType(ext) {
    const searchInput = document.getElementById('searchInput');
    const currentValue = searchInput.value.trim();
    
    // 移除已有的 filetype: 操作符
    const cleanValue = currentValue.replace(/filetype:\S+\s*/g, '').trim();
    
    // 添加新的文件类型
    searchInput.value = `filetype:${ext} ${cleanValue}`;
    
    closeFileTypeModal();
    searchInput.focus();
}
