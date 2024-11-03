const languages = {
    en: {
        title: "Advanced Search Assistant",
        searchPlaceholder: "Enter search terms...",
        searchButton: "Search",
        defaultTip: "Select a search tool or user type to get started",
        userTypes: {
            general: "General User",  // 添加普通用户
            researcher: "Academic Researcher",
            dataAnalyst: "Data Analyst",
            investigativeJournalist: "Investigative Journalist",
            marketResearcher: "Market Researcher",
            legalProfessional: "Legal Professional"
        },
        tools: {
            exactMatch: {
                name: "Exact Match",
                description: "Search for exact phrase matches",
                suggestion: 'Use quotes around your phrase, e.g., "exact phrase"'
            },
            exclude: {
                name: "Exclude Terms",
                description: "Exclude specific terms from results",
                suggestion: 'Add minus sign before terms to exclude, e.g., -exclude'
            },
            siteSearch: {
                name: "Site Search",
                description: "Search within a specific website",
                suggestion: 'Use site: operator, e.g., site:example.com'
            },
            fileType: {
                name: "File Type",
                description: "Search for specific file types",
                suggestion: 'Use filetype: operator, e.g., filetype:pdf'
            },
            orSearch: {
                name: "OR Search",
                description: "Search for either term",
                suggestion: 'Use OR between terms, e.g., term1 OR term2'
            },
            scholarSearch: {
                name: "Scholar Search",
                description: "Search academic papers",
                suggestion: 'Add scholar: prefix for academic results'
            },
            citationSearch: {
                name: "Citation Search",
                description: "Search for citations",
                suggestion: 'Use cite: operator to find citations'
            },
            timeRangeSearch: {
                name: "Time Range",
                description: "Search within time period",
                suggestion: 'Use daterange: operator or time filters'
            },
            relatedSites: {
                name: "Related Sites",
                description: "Find similar websites",
                suggestion: 'Use related: operator, e.g., related:example.com'
            },
            cache: {
                name: "Cached Page",
                description: "View Google's cached version of a page",
                suggestion: 'Use cache: operator, e.g., cache:website.com'
            },
            numberRange: {
                name: "Number Range",
                description: "Search for numbers within a range",
                suggestion: 'Use .. between numbers, e.g., price 100..200'
            },
            define: {
                name: "Definition",
                description: "Look up word definitions",
                suggestion: 'Use define: operator, e.g., define:word'
            },
            calculator: {
                name: "Calculator",
                description: "Perform calculations",
                suggestion: 'Enter mathematical expression directly'
            },
            locationSearch: {
                name: "Location",
                description: "Search in specific location",
                suggestion: 'Add location name to search terms'
            },
            newsSearch: {
                name: "News Search",
                description: "Search news articles",
                suggestion: 'Use news: operator for news results'
            },
            trendSearch: {
                name: "Trends",
                description: "Search trending topics",
                suggestion: 'Use trends: operator to see trends'
            },
            similarSites: {
                name: "Similar Sites",
                description: "Find similar websites",
                suggestion: 'Use similar: operator to find similar sites'
            },
            iconSearch: {
                name: "Icon Search",
                description: "Search for website icons",
                suggestion: 'Use icon: operator to find website icons'
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Search downloadable YouTube videos",
                suggestion: 'Use youtube: operator to find videos'
            },
            demandSearch: {
                name: "Demand Search",
                description: "Search for market demands",
                suggestion: 'Use demand: operator to find demands'
            },
            imageSearch: {
                name: "Image Search",
                description: "Search for images",
                suggestion: 'Use image: operator to find images'
            },
            patentSearch: {
                name: "Patent Search",
                description: "Search for patents",
                suggestion: 'Use patent: operator to find patents'
            },
            hashtagSearch: {
                name: "Hashtag Search",
                description: "Search for hashtags",
                suggestion: 'Use hashtag: operator to find hashtags'
            },
            urlSearch: {
                name: "URL Search",
                description: "Search for specific URLs",
                suggestion: 'Use url: operator to find specific URLs'
            },
            commonCrawl: {
                name: "CommonCrawl Search",
                description: "Search CommonCrawl database",
                suggestion: 'Use cc: operator to search CommonCrawl'
            },
            keywordExplorer: {
                name: "Keyword Explorer",
                description: "Explore related keywords and variations",
                suggestion: "Click to open keyword exploration tool"
            }
        },
        tipPrefix: "Tip: "
    },
    zh: {
        title: "SearchKit", // 修改这里，从"高级搜索助手"改为"SearchKit"
        searchPlaceholder: "输入搜索词...",
        searchButton: "搜索",
        defaultTip: "选择搜索工具或用户类型开始",
        userTypes: {
            general: "普通用户",  // 添加普通用户
            researcher: "学术研究者",
            dataAnalyst: "数据分析师",
            investigativeJournalist: "调查记者",
            marketResearcher: "市场研究员",
            legalProfessional: "法律专业人士"
        },
        tools: {
            exactMatch: {
                name: "精确匹配",
                description: "搜索完全匹配的短语",
                suggestion: '在短语两边加引号，例如："精确短语"'
            },
            exclude: {
                name: "排除词",
                description: "从结果中排除特定词语",
                suggestion: '在要排除的词前加减号，例如：-排除词'
            },
            siteSearch: {
                name: "站内搜索",
                description: "在特定网站内搜索",
                suggestion: '使用site:运算符，例如：site:example.com'
            },
            fileType: {
                name: "文件类型",
                description: "搜索特定类型的文件",
                suggestion: '使用filetype:运算符，例如：filetype:pdf'
            },
            orSearch: {
                name: "或搜索",
                description: "搜索一关键词",
                suggestion: '使用OR连接词语，例如：词1 OR 词2'
            },
            scholarSearch: {
                name: "学术搜索",
                description: "搜索学术论文",
                suggestion: '添加scholar:前缀搜索学术内容'
            },
            citationSearch: {
                name: "引用搜索",
                description: "搜索引用信息",
                suggestion: '使用cite:运算符查找引用'
            },
            timeRangeSearch: {
                name: "时间范围",
                description: "在特定时间段内搜索",
                suggestion: '使用daterange:运算符或时间筛选'
            },
            relatedSites: {
                name: "相关网站",
                description: "查找类似的网站",
                suggestion: '使用related:运算符，例如：related:example.com'
            },
            cache: {
                name: "网页快照",
                description: "查看Google的网页快照",
                suggestion: '使用cache:运算符，例如：cache:website.com'
            },
            numberRange: {
                name: "数字范围",
                description: "搜索特定范围内的数字",
                suggestion: '使用..连接数字，例如：价格 100..200'
            },
            define: {
                name: "定义",
                description: "查找词语定义",
                suggestion: '使用define:运算符，例如：define:词语'
            },
            calculator: {
                name: "计算器",
                description: "执行数学计算",
                suggestion: '直接输入数学表达式'
            },
            locationSearch: {
                name: "位置搜索",
                description: "在特定位置搜索",
                suggestion: '添加位置名称到搜索词中'
            },
            newsSearch: {
                name: "新闻搜索",
                description: "搜索新闻文章",
                suggestion: '使用news:运算符搜索新闻'
            },
            trendSearch: {
                name: "趋势",
                description: "搜索热门趋势",
                suggestion: '使用trends:运算符查看趋势'
            },
            similarSites: {
                name: "同类网站",
                description: "查找类似的网站",
                suggestion: '使用similar:运算符查找类似网站'
            },
            iconSearch: {
                name: "图标搜索",
                description: "搜索网站图标",
                suggestion: '使用icon:运算符搜索网站图标'
            },
            youtubeDownload: {
                name: "YouTube下载",
                description: "搜索可下载的YouTube视频",
                suggestion: '使用youtube:运算符查找视频'
            },
            demandSearch: {
                name: "需求搜索",
                description: "搜索市场需求",
                suggestion: '使用demand:运算符查找需求'
            },
            imageSearch: {
                name: "图片搜索",
                description: "搜索图片",
                suggestion: '使用image:运算符搜索图片'
            },
            patentSearch: {
                name: "专利搜索",
                description: "搜索专利",
                suggestion: '使用patent:运算符搜索专利'
            },
            hashtagSearch: {
                name: "话题标签搜索",
                description: "搜索话题标签",
                suggestion: '使用hashtag:运算符搜索话题标签'
            },
            urlSearch: {
                name: "URL搜索",
                description: "搜索特定URL",
                suggestion: '使用url:运算符搜索特定URL'
            },
            commonCrawl: {
                name: "CommonCrawl搜索",
                description: "搜索CommonCrawl数据库",
                suggestion: '使用cc:运算符搜索CommonCrawl'
            },
            keywordExplorer: {
                name: "关键词拓展",
                description: "探索相关关键词和变体",
                suggestion: "点击打开关键词拓展工具"
            }
        },
        tipPrefix: "提示："
    },
    ja: {
        title: "高度な検索アシスタント",
        searchPlaceholder: "検索語を入力...",
        searchButton: "検索",
        defaultTip: "検索ツールまたはユーザータイプを選択して開始",
        userTypes: {
            general: "一般ユーザー",  // 添加普通用户
            researcher: "学術研究者",
            dataAnalyst: "データアナリスト",
            investigativeJournalist: "調査ジャーナリスト",
            marketResearcher: "市場調査員",
            legalProfessional: "法律専門家"
        },
        tools: {
            exactMatch: {
                name: "完全一致",
                description: "フレーズの完全一致を検索",
                suggestion: 'フレーズを引用符で囲む。例："完全一致"'
            },
            exclude: {
                name: "除外",
                description: "特定の用語を結果から除外",
                suggestion: '除外する用語の前にマイナス記号を付ける。例：-除外語'
            },
            siteSearch: {
                name: "サイト内検索",
                description: "特定のウェブサイト内で検索",
                suggestion: 'site:演算子を使用。例：site:example.com'
            },
            fileType: {
                name: "ファイルタイプ",
                description: "特定のファイルタイプを検索",
                suggestion: 'filetype:演算子を使用。例：filetype:pdf'
            },
            orSearch: {
                name: "OR検索",
                description: "いずれかの用語を検索",
                suggestion: '用語の間にORを入れる。例：term1 OR term2'
            },
            scholarSearch: {
                name: "学術検索",
                description: "学術論文を検索",
                suggestion: 'scholar:プレフィックスを追加'
            },
            citationSearch: {
                name: "引用検索",
                description: "引用情報を検索",
                suggestion: 'cite:演算子を使用して引用を検索'
            },
            timeRangeSearch: {
                name: "期間指定",
                description: "特定の期間内で検索",
                suggestion: 'daterange:演算子または時間フィルターを使用'
            },
            relatedSites: {
                name: "関サイト",
                description: "類似のウェブサイトを検索",
                suggestion: 'related:演算子を使用。例：related:example.com'
            },
            cache: {
                name: "キャッシュ",
                description: "Googleのキャッシュバージョンを表示",
                suggestion: 'cache:演算子を使用。例：cache:website.com'
            },
            numberRange: {
                name: "数値範囲",
                description: "特定の範囲内の数値を検索",
                suggestion: '数値の間に..を使用。例：価格 100..200'
            },
            define: {
                name: "定義",
                description: "単語の定義を検索",
                suggestion: 'define:演算子を使用。例：define:単語'
            },
            calculator: {
                name: "計算機",
                description: "数式を計算",
                suggestion: '数式を直接入力'
            },
            locationSearch: {
                name: "場所検索",
                description: "特定の場所で検索",
                suggestion: '検索語に場所名を追加'
            },
            newsSearch: {
                name: "ニュース検索",
                description: "ニュース記事を検索",
                suggestion: 'news:演算子を使用しニュースを索'
            },
            trendSearch: {
                name: "トレンド",
                description: "トレンドトピックを検索",
                suggestion: 'trends:演算子を使用してトレンドを確認'
            },
            similarSites: {
                name: "類似サイト",
                description: "類似のウェブサイトを検索",
                suggestion: 'similar:演算子を使用して類似サイトを検索'
            },
            iconSearch: {
                name: "アイコン検索",
                description: "ウェブサイトのアイコンを検索",
                suggestion: 'icon:演算子を使用してアイコンを検索'
            },
            youtubeDownload: {
                name: "YouTube ダウンロード",
                description: "ダウンロード可能なYouTube動画を検索",
                suggestion: 'youtube:演算子を使用して動画を検索'
            },
            demandSearch: {
                name: "需要検索",
                description: "市場の需要を検索",
                suggestion: 'demand:演算子を使用して需要を検索'
            },
            imageSearch: {
                name: "画像検索",
                description: "画像を検索",
                suggestion: 'image:演算子を使用して画像を検索'
            },
            patentSearch: {
                name: "特許検索",
                description: "特許を検索",
                suggestion: 'patent:演算子を使用して特許を検索'
            },
            hashtagSearch: {
                name: "ハッシュタグ検索",
                description: "ハッシュタグを検索",
                suggestion: 'hashtag:演算子を使用してハッシュタグを検索'
            },
            urlSearch: {
                name: "URL検索",
                description: "特定のURLを検索",
                suggestion: 'url:演算子を使用して特定のURLを検索'
            },
            commonCrawl: {
                name: "CommonCrawl検索",
                description: "CommonCrawlデータベースを検索",
                suggestion: 'cc:演算子を使用してCommonCrawlを検索'
            },
            keywordExplorer: {
                name: "Keyword Explorer",
                description: "Explore related keywords and variations",
                suggestion: "Click to open keyword exploration tool"
            }
        },
        tipPrefix: "ヒント："
    },
    ko: {
        title: "고급 검색 도우미",
        searchPlaceholder: "검색어를 입력하세요...",
        searchButton: "검색",
        defaultTip: "검색 도구 또는 사용자 유형을 선택하여 시작하세요",
        userTypes: {
            general: "일반 사용자",  // 添加普通用户
            researcher: "학술 연구원",
            dataAnalyst: "데이터 분석가",
            investigativeJournalist: "탐사 기자",
            marketResearcher: "시장 조사원",
            legalProfessional: "법률 전문가"
        },
        tools: {
            exactMatch: {
                name: "정확한 일치",
                description: "정확한 구문 검색",
                suggestion: '구문을 따옴표로 묶으세. 예: "정확한 구문"'
            },
            exclude: {
                name: "외",
                description: "특정 단어 제외",
                suggestion: '제외할 단어 앞에 마이너스 기호를 붙이세요. 예: -제외어'
            },
            siteSearch: {
                name: "사이트 검색",
                description: "특정 웹사이트 내 검색",
                suggestion: 'site: 연산자 사용. 예: site:example.com'
            },
            fileType: {
                name: "파일 유형",
                description: "특정 파일 유형 검색",
                suggestion: 'filetype: 연산자 사용. 예: filetype:pdf'
            },
            orSearch: {
                name: "OR 검색",
                description: "여러 검색어 중 하나 검색",
                suggestion: '검색어 사이에 OR 입력. 예: 단어1 OR 단어2'
            },
            scholarSearch: {
                name: "학술 검색",
                description: "학술 논문 검색",
                suggestion: 'scholar: 접두어 사용'
            },
            citationSearch: {
                name: "인용 검색",
                description: "인용 정보 검색",
                suggestion: 'cite: 연산자로 인용 검색'
            },
            timeRangeSearch: {
                name: "기간 검색",
                description: "특정 기간 내 검색",
                suggestion: 'daterange: 연산자 또는 기간 필터 사용'
            },
            relatedSites: {
                name: "관련 사이트",
                description: "유사한 웹사이트 찾기",
                suggestion: 'related: 연산자 사용. 예: related:example.com'
            },
            cache: {
                name: "캐시 페이지",
                description: "Google의 캐시된 페이지 보기",
                suggestion: 'cache: 연산자 사용. 예: cache:website.com'
            },
            numberRange: {
                name: "숫자 범위",
                description: "특정 범위 내의 숫자 검색",
                suggestion: '숫자 사이에 .. 사용. 예: 가격 100..200'
            },
            define: {
                name: "정의",
                description: "단어 정의 찾기",
                suggestion: 'define: 연산자 사용. 예: define:단어'
            },
            calculator: {
                name: "계산기",
                description: "수학 계산 수행",
                suggestion: '수식을 직접 입력'
            },
            locationSearch: {
                name: "위치 검색",
                description: "특정 위치에서 검색",
                suggestion: '검색어에 위치 이름 추가'
            },
            newsSearch: {
                name: "뉴스 검색",
                description: "뉴스 기사 검색",
                suggestion: 'news: 연산자를 사용하여 뉴스 검색'
            },
            trendSearch: {
                name: "���렌드",
                description: "인기 주제 검색",
                suggestion: 'trends: 연산자를 사용하여 트렌드 확인'
            },
            similarSites: {
                name: "유사 사이트",
                description: "유사한 웹사이트 찾기",
                suggestion: 'similar: 연산자를 사용하여 유사 사이트 검색'
            },
            iconSearch: {
                name: "아이콘 검색",
                description: "웹사이트 아이콘 검색",
                suggestion: 'icon: 연산자를 사용하여 아이콘 검색'
            },
            youtubeDownload: {
                name: "YouTube 다운로드",
                description: "다운로드 가능한 YouTube 동영상 검색",
                suggestion: 'youtube: 연산자를 사용하여 동영상 검색'
            },
            demandSearch: {
                name: "수요 검색",
                description: "시장 수요 검색",
                suggestion: 'demand: 연산자를 사용하여 수요 검색'
            },
            imageSearch: {
                name: "이미지 검색",
                description: "이미지 검색",
                suggestion: 'image: 연산자를 사용하여 이미지 검색'
            },
            patentSearch: {
                name: "특허 검색",
                description: "특허 검색",
                suggestion: 'patent: 연산자를 사용하여 특허 검색'
            },
            hashtagSearch: {
                name: "해시태그 검색",
                description: "해시태그 검색",
                suggestion: 'hashtag: 연산자를 사용하여 해시태그 검색'
            },
            urlSearch: {
                name: "URL 검색",
                description: "특정 URL 검색",
                suggestion: 'url: 연산자를 사용하여 특정 URL 검색'
            },
            commonCrawl: {
                name: "CommonCrawl 검색",
                description: "CommonCrawl 데이터베이스 검색",
                suggestion: 'cc: 연산자를 사용하여 CommonCrawl 검색'
            },
            keywordExplorer: {
                name: "Keyword Explorer",
                description: "Explore related keywords and variations",
                suggestion: "Click to open keyword exploration tool"
            }
        },
        tipPrefix: "팁: "
    },
    es: {
        title: "Asistente de búsqueda avanzada",
        searchPlaceholder: "Ingrese términos de búsqueda...",
        searchButton: "Buscar",
        defaultTip: "Seleccione una herramienta de búsqueda o tipo de usuario para empezar",
        userTypes: {
            general: "Usuario general",  // 添加普通用户
            researcher: "Investigador académico",
            dataAnalyst: "Analista de datos",
            investigativeJournalist: "Periodista investigador",
            marketResearcher: "Investigador de mercado",
            legalProfessional: "Profesional legal"
        },
        tools: {
            exactMatch: {
                name: "Coincidencia exacta",
                description: "Buscar coincidencias exactas de frases",
                suggestion: 'Use comillas alrededor de tu frase, e.g., "frase exacta"'
            },
            exclude: {
                name: "Excluir términos",
                description: "Excluir términos específicos de los resultados",
                suggestion: 'Agregue un signo menos antes de los términos para excluir, e.g., -excluir'
            },
            siteSearch: {
                name: "Búsqueda en sitio",
                description: "Buscar dentro de un sitio web específico",
                suggestion: 'Use el operador site:, e.g., site:example.com'
            },
            fileType: {
                name: "Tipo de archivo",
                description: "Buscar archivos de un tipo específico",
                suggestion: 'Use el operador filetype:, e.g., filetype:pdf'
            },
            orSearch: {
                name: "Búsqueda OR",
                description: "Buscar términos OR",
                suggestion: 'Use OR entre términos, e.g., término1 OR término2'
            },
            scholarSearch: {
                name: "Búsqueda académica",
                description: "Buscar artículos académicos",
                suggestion: 'Agregue el prefijo scholar: para resultados académicos'
            },
            citationSearch: {
                name: "Búsqueda de citas",
                description: "Buscar citas",
                suggestion: 'Use el operador cite: para encontrar citas'
            },
            timeRangeSearch: {
                name: "Rango de tiempo",
                description: "Buscar dentro de un rango de tiempo",
                suggestion: 'Use el operador daterange: o filtros de tiempo'
            },
            relatedSites: {
                name: "Sitios relacionados",
                description: "Encontrar sitios web similares",
                suggestion: 'Use el operador related:, ej: related:example.com'
            },
            cache: {
                name: "Página en caché",
                description: "Ver la versión en caché de Google de una página",
                suggestion: 'Use el operador cache:, ej: cache:website.com'
            },
            numberRange: {
                name: "Rango numérico",
                description: "Buscar números dentro de un rango",
                suggestion: 'Use .. entre números, ej: precio 100..200'
            },
            define: {
                name: "Definición",
                description: "Buscar definiciones de palabras",
                suggestion: 'Use el operador define:, ej: define:palabra'
            },
            calculator: {
                name: "Calculadora",
                description: "Realizar cálculos",
                suggestion: 'Ingrese la expresión matemática directamente'
            },
            locationSearch: {
                name: "Ubicación",
                description: "Buscar en una ubicación específica",
                suggestion: 'Agregue el nombre de la ubicación a los términos de búsqueda'
            },
            newsSearch: {
                name: "Búsqueda de noticias",
                description: "Buscar artículos de noticias",
                suggestion: 'Use el operador news: para resultados de noticias'
            },
            trendSearch: {
                name: "Tendencias",
                description: "Buscar temas tendencia",
                suggestion: 'Use el operador trends: para ver tendencias'
            },
            similarSites: {
                name: "Sitios similares",
                description: "Encontrar sitios web similares",
                suggestion: 'Use el operador similar: para encontrar sitios similares'
            },
            iconSearch: {
                name: "Búsqueda de iconos",
                description: "Buscar iconos de sitios web",
                suggestion: 'Use el operador icon: para encontrar iconos'
            },
            youtubeDownload: {
                name: "Descarga de YouTube",
                description: "Buscar videos descargables de YouTube",
                suggestion: 'Use el operador youtube: para encontrar videos'
            },
            demandSearch: {
                name: "Búsqueda de demanda",
                description: "Buscar demandas del mercado",
                suggestion: 'Use el operador demand: para encontrar demandas'
            },
            imageSearch: {
                name: "Búsqueda de imágenes",
                description: "Buscar imágenes",
                suggestion: 'Use el operador image: para encontrar imágenes'
            },
            patentSearch: {
                name: "Búsqueda de patentes",
                description: "Buscar patentes",
                suggestion: 'Use el operador patent: para encontrar patentes'
            },
            hashtagSearch: {
                name: "Búsqueda de hashtags",
                description: "Buscar hashtags",
                suggestion: 'Use el operador hashtag: para encontrar hashtags'
            },
            urlSearch: {
                name: "Búsqueda de URL",
                description: "Buscar URLs específicas",
                suggestion: 'Use el operador url: para encontrar URLs específicas'
            },
            commonCrawl: {
                name: "Búsqueda CommonCrawl",
                description: "Buscar en la base de datos CommonCrawl",
                suggestion: 'Use el operador cc: para buscar en CommonCrawl'
            },
            keywordExplorer: {
                name: "Keyword Explorer",
                description: "Explore related keywords and variations",
                suggestion: "Click to open keyword exploration tool"
            }
        },
        tipPrefix: "Consejo: "
    },
    de: {
        title: "Fortgeschrittener Suchassistent",
        searchPlaceholder: "Geben Sie Suchbegriffe ein...",
        searchButton: "Suchen",
        defaultTip: "Wählen Sie eine Suchhilfe oder Benutzerart, um zu beginnen",
        userTypes: {
            general: "Allgemeiner Benutzer",  // 添加普通用户
            researcher: "Akademischer Forscher",
            dataAnalyst: "Datenanalyst",
            investigativeJournalist: "Investigativer Journalist",
            marketResearcher: "Marktforscher",
            legalProfessional: "Rechtlicher Fachmann"
        },
        tools: {
            exactMatch: {
                name: "Genauer Suchbegriff",
                description: "Suchen Sie nach genauen Phrasen",
                suggestion: 'Verwenden Sie Anführungszeichen um Ihre Phrase zu umschließen, z.B. "genauer Suchbegriff"'
            },
            exclude: {
                name: "Ausklammern",
                description: "Ausklammern Sie bestimmte Begriffe aus den Ergebnissen",
                suggestion: 'Fügen Sie ein Minuszeichen vor die Begriffe, die Sie ausklammern möchten, z.B. -ausklammern'
            },
            siteSearch: {
                name: "Suche auf Seite",
                description: "Suchen Sie innerhalb einer bestimmten Website",
                suggestion: 'Verwenden Sie den Operator site:, z.B. site:example.com'
            },
            fileType: {
                name: "Dateityp",
                description: "Suchen Sie nach bestimmten Dateitypen",
                suggestion: 'Verwenden Sie den Operator filetype:, z.B. filetype:pdf'
            },
            orSearch: {
                name: "Oder-Suche",
                description: "Suchen Sie nach bestimmten Begriffen",
                suggestion: 'Verwenden Sie den Operator OR, z.B. Begriff1 OR Begriff2'
            },
            scholarSearch: {
                name: "Akademische Suche",
                description: "Suchen Sie nach akademischen Artikeln",
                suggestion: 'Fügen Sie den Prefix scholar: hinzu'
            },
            citationSearch: {
                name: "Zitatsuche",
                description: "Suchen Sie nach Zitaten",
                suggestion: 'Verwenden Sie den Operator cite: um Zitate zu finden'
            },
            timeRangeSearch: {
                name: "Zeitraum",
                description: "Suchen Sie innerhalb eines bestimmten Zeitraums",
                suggestion: 'Verwenden Sie den Operator daterange: oder Zeitfilter'
            },
            relatedSites: {
                name: "Verwandte Seiten",
                description: "Ähnliche Webseiten finden",
                suggestion: 'Verwenden Sie den Operator related:, z.B. related:example.com'
            },
            cache: {
                name: "Zwischenspeicher",
                description: "Google-Cache-Version einer Seite anzeigen",
                suggestion: 'Verwenden Sie den Operator cache:, z.B. cache:website.com'
            },
            numberRange: {
                name: "Zahlenbereich",
                description: "Nach Zahlen in einem bestimmten Bereich suchen",
                suggestion: 'Verwenden Sie .. zwischen Zahlen, z.B. Preis 100..200'
            },
            define: {
                name: "Definition",
                description: "Wortdefinitionen nachschlagen",
                suggestion: 'Verwenden Sie den Operator define:, z.B. define:Wort'
            },
            calculator: {
                name: "Taschenrechner",
                description: "Berechnungen durchführen",
                suggestion: 'Geben Sie den mathematischen Ausdruck direkt ein'
            },
            locationSearch: {
                name: "Standortsuche",
                description: "An einem bestimmten Ort suchen",
                suggestion: 'Fügen Sie den Ortsnamen zu den Suchbegriffen hinzu'
            },
            newsSearch: {
                name: "Nachrichtensuche",
                description: "Nachrichtenartikel suchen",
                suggestion: 'Verwenden Sie den Operator news: für Nachrichtenergebnisse'
            },
            trendSearch: {
                name: "Trends",
                description: "Nach Trendthemen suchen",
                suggestion: 'Verwenden Sie den Operator trends: um Trends zu sehen'
            },
            similarSites: {
                name: "Ähnliche Seiten",
                description: "Ähnliche Webseiten finden",
                suggestion: 'Verwenden Sie den Operator similar: um ähnliche Seiten zu finden'
            },
            iconSearch: {
                name: "Icon-Suche",
                description: "Nach Website-Icons suchen",
                suggestion: 'Verwenden Sie den Operator icon: um Icons zu finden'
            },
            youtubeDownload: {
                name: "YouTube-Download",
                description: "Nach herunterladbaren YouTube-Videos suchen",
                suggestion: 'Verwenden Sie den Operator youtube: um Videos zu finden'
            },
            demandSearch: {
                name: "Bedarfssuche",
                description: "Nach Marktbedarf suchen",
                suggestion: 'Verwenden Sie den Operator demand: um Bedarf zu finden'
            },
            imageSearch: {
                name: "Bildersuche",
                description: "Nach Bildern suchen",
                suggestion: 'Verwenden Sie den Operator image: um Bilder zu finden'
            },
            patentSearch: {
                name: "Patentsuche",
                description: "Nach Patenten suchen",
                suggestion: 'Verwenden Sie den Operator patent: um Patente zu finden'
            },
            hashtagSearch: {
                name: "Hashtag-Suche",
                description: "Nach Hashtags suchen",
                suggestion: 'Verwenden Sie den Operator hashtag: um Hashtags zu finden'
            },
            urlSearch: {
                name: "URL-Suche",
                description: "Nach bestimmten URLs suchen",
                suggestion: 'Verwenden Sie den Operator url: um bestimmte URLs zu finden'
            },
            commonCrawl: {
                name: "CommonCrawl-Suche",
                description: "CommonCrawl-Datenbank durchsuchen",
                suggestion: 'Verwenden Sie den Operator cc: um CommonCrawl zu durchsuchen'
            },
            keywordExplorer: {
                name: "Keyword Explorer",
                description: "Explore related keywords and variations",
                suggestion: "Click to open keyword exploration tool"
            }
        },
        tipPrefix: "Tip: "
    },
    fr: {
        title: "Assistant de recherche avancé",
        searchPlaceholder: "Entrez des termes de recherche...",
        searchButton: "Rechercher",
        defaultTip: "Sélectionnez une aide de recherche ou un type d'utilisateur pour commencer",
        userTypes: {
            general: "Utilisateur général",  // 添加普通用户
            researcher: "Chercheur académique",
            dataAnalyst: "Analyste de données",
            investigativeJournalist: "Journaliste d'enquête",
            marketResearcher: "Rechercheur de marché",
            legalProfessional: "Professionnel juridique"
        },
        tools: {
            exactMatch: {
                name: "Correspondance exacte",
                description: "Rechercher des correspondances exactes de phrases",
                suggestion: 'Utilisez des guillemets autour de votre phrase, ex: "phrase exacte"'
            },
            exclude: {
                name: "Exclure des termes",
                description: "Exclure des termes spécifiques des résultats",
                suggestion: 'Ajoutez un signe moins devant les termes à exclure, ex: -exclure'
            },
            siteSearch: {
                name: "Recherche sur site",
                description: "Rechercher dans un site web spécifique",
                suggestion: 'Utilisez l\'opérateur site:, ex: site:example.com'
            },
            fileType: {
                name: "Type de fichier",
                description: "Rechercher des types de fichiers spécifiques",
                suggestion: 'Utilisez l\'opérateur filetype:, ex: filetype:pdf'
            },
            orSearch: {
                name: "Recherche OU",
                description: "Rechercher l'un ou l'autre terme",
                suggestion: 'Utilisez OR entre les termes, ex: terme1 OR terme2'
            },
            scholarSearch: {
                name: "Recherche académique",
                description: "Rechercher des articles académiques",
                suggestion: 'Ajoutez le préfixe scholar: pour les résultats académiques'
            },
            citationSearch: {
                name: "Recherche de citations",
                description: "Rechercher des citations",
                suggestion: 'Utilisez l\'opérateur cite: pour trouver des citations'
            },
            timeRangeSearch: {
                name: "Période",
                description: "Rechercher dans une période spécifique",
                suggestion: 'Utilisez l\'opérateur daterange: ou les filtres de temps'
            },
            relatedSites: {
                name: "Related Sites",
                description: "Find similar websites",
                suggestion: 'Use related: operator, e.g., related:example.com'
            },
            cache: {
                name: "Cached Page",
                description: "View Google's cached version of a page",
                suggestion: 'Use cache: operator, e.g., cache:website.com'
            },
            numberRange: {
                name: "Number Range",
                description: "Search for numbers within a range",
                suggestion: 'Use .. between numbers, e.g., price 100..200'
            },
            define: {
                name: "Definition",
                description: "Look up word definitions",
                suggestion: 'Use define: operator, e.g., define:word'
            },
            calculator: {
                name: "Calculator",
                description: "Perform calculations",
                suggestion: 'Enter mathematical expression directly'
            },
            locationSearch: {
                name: "Location",
                description: "Search in specific location",
                suggestion: 'Add location name to search terms'
            },
            newsSearch: {
                name: "News Search",
                description: "Search news articles",
                suggestion: 'Use news: operator for news results'
            },
            trendSearch: {
                name: "Trends",
                description: "Search trending topics",
                suggestion: 'Use trends: operator to see trends'
            },
            similarSites: {
                name: "Similar Sites",
                description: "Find similar websites",
                suggestion: 'Use similar: operator to find similar sites'
            },
            iconSearch: {
                name: "Icon Search",
                description: "Search for website icons",
                suggestion: 'Use icon: operator to find website icons'
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Search downloadable YouTube videos",
                suggestion: 'Use youtube: operator to find videos'
            },
            demandSearch: {
                name: "Demand Search",
                description: "Search for market demands",
                suggestion: 'Use demand: operator to find demands'
            },
            imageSearch: {
                name: "Image Search",
                description: "Search for images",
                suggestion: 'Use image: operator to find images'
            },
            patentSearch: {
                name: "Patent Search",
                description: "Search for patents",
                suggestion: 'Use patent: operator to find patents'
            },
            hashtagSearch: {
                name: "Hashtag Search",
                description: "Search for hashtags",
                suggestion: 'Use hashtag: operator to find hashtags'
            },
            urlSearch: {
                name: "URL Search",
                description: "Search for specific URLs",
                suggestion: 'Use url: operator to find specific URLs'
            },
            commonCrawl: {
                name: "CommonCrawl Search",
                description: "Search CommonCrawl database",
                suggestion: 'Use cc: operator to search CommonCrawl'
            },
            keywordExplorer: {
                name: "Keyword Explorer",
                description: "Explore related keywords and variations",
                suggestion: "Click to open keyword exploration tool"
            }
        },
        tipPrefix: "Conseil: "
    }
};

const searchTools = [
    {
        name: "exactMatch",
        prefix: '"',
        suffix: '"'
    },
    {
        name: "exclude",
        prefix: "-"
    },
    {
        name: "siteSearch",
        prefix: "site:"
    },
    {
        name: "fileType",
        prefix: "filetype:"
    },
    {
        name: "orSearch",
        infix: " OR "
    },
    {
        name: "scholarSearch",
        prefix: "scholar:"
    },
    {
        name: "citationSearch",
        prefix: "cite:"
    },
    {
        name: "timeRangeSearch",
        prefix: "daterange:"
    },
    {
        name: "relatedSites",
        prefix: "related:"
    },
    {
        name: "cache",
        prefix: "cache:"
    },
    {
        name: "numberRange",
        infix: ".."
    },
    {
        name: "define",
        prefix: "define:"
    },
    {
        name: "calculator",
        prefix: "="
    },
    {
        name: "locationSearch",
        prefix: "location:"
    },
    {
        name: "newsSearch",
        prefix: "news:"
    },
    {
        name: "trendSearch",
        prefix: "trends:"
    },
    {
        name: "similarSites",
        prefix: "similar:"
    },
    {
        name: "iconSearch",
        prefix: "icon:"
    },
    {
        name: "youtubeDownload",
        prefix: "youtube:"
    },
    {
        name: "demandSearch",
        prefix: "demand:"
    },
    {
        name: "imageSearch",
        prefix: "image:"
    },
    {
        name: "patentSearch",
        prefix: "patent:"
    },
    {
        name: "hashtagSearch",
        prefix: "hashtag:"
    },
    {
        name: "urlSearch",
        prefix: "url:"
    },
    {
        name: "commonCrawl",
        prefix: "cc:"
    }
];

// 在 explorerTranslations 中添加其他语言的翻译
const explorerTranslations = {
    en: {
        title: "Keyword Explorer",
        inputPlaceholder: "Enter a keyword to explore...",
        exploreButton: "Explore",
        backLink: "← Back to SearchKit",
        categoryNames: {
            base: 'Basic Suggestions',
            alphabet: 'A-Z Combinations',
            comparison: 'Comparisons & Alternatives',
            action: 'Actions & Tutorials',
            attribute: 'Attributes & Quality',
            time: 'Time & Versions',
            feature: 'Features & Settings',
            question: 'Questions & Queries',
            download: 'Downloads & Installation',
            review: 'Reviews & Ratings',
            problem: 'Problems & Solutions',
            business: 'Business & Pricing'
        }
    },
    zh: {
        title: "关键词拓展",
        inputPlaceholder: "输入关键词进行探索...",
        exploreButton: "探索",
        backLink: "← 返回 SearchKit",
        categoryNames: {
            base: '基础建议',
            alphabet: '字母组合',
            comparison: '比较与替代',
            action: '操作与教程',
            attribute: '属性与质量',
            time: '时间与版本',
            feature: '功能与设置',
            question: '问题与查询',
            download: '下载与安装',
            review: '评价与评分',
            problem: '问题与解决',
            business: '商业与定价'
        }
    },
    ja: {
        title: "キーワードエクスプローラー",
        inputPlaceholder: "キーワードを入力して探索...",
        exploreButton: "探索",
        backLink: "← SearchKit に戻る",
        categoryNames: {
            base: '基本的な提案',
            alphabet: 'アルファベット組み合わせ',
            comparison: '比較と代替',
            action: '操作とチュートリアル',
            attribute: '属性と品質',
            time: '時間とバージョン',
            feature: '機能と設定',
            question: '質問とクエリ',
            download: 'ダウンロードとインストール',
            review: 'レビューと評価',
            problem: '問題と解決',
            business: 'ビジネスと価格'
        }
    },
    ko: {
        title: "키워드 탐색기",
        inputPlaceholder: "키워드를 입력하여 탐색...",
        exploreButton: "탐색",
        backLink: "← SearchKit으로 돌아가기",
        categoryNames: {
            base: '기본 제안',
            alphabet: '알파벳 조합',
            comparison: '비교 및 대안',
            action: '작업 및 튜토리얼',
            attribute: '속성 및 품질',
            time: '시간 및 버전',
            feature: '기능 및 설정',
            question: '질문 및 쿼리',
            download: '다운로드 및 설치',
            review: '리뷰 및 평가',
            problem: '문제 및 해결',
            business: '비즈니스 및 가격'
        }
    },
    es: {
        title: "Explorador de Palabras Clave",
        inputPlaceholder: "Ingrese una palabra clave para explorar...",
        exploreButton: "Explorar",
        backLink: "← Volver a SearchKit",
        categoryNames: {
            base: 'Sugerencias Básicas',
            alphabet: 'Combinaciones A-Z',
            comparison: 'Comparaciones y Alternativas',
            action: 'Acciones y Tutoriales',
            attribute: 'Atributos y Calidad',
            time: 'Tiempo y Versiones',
            feature: 'Características y Configuración',
            question: 'Preguntas y Consultas',
            download: 'Descargas e Instalación',
            review: 'Reseñas y Calificaciones',
            problem: 'Problemas y Soluciones',
            business: 'Negocios y Precios'
        }
    },
    de: {
        title: "Keyword-Explorer",
        inputPlaceholder: "Geben Sie ein Keyword ein...",
        exploreButton: "Erkunden",
        backLink: "← Zurück zu SearchKit",
        categoryNames: {
            base: 'Grundlegende Vorschläge',
            alphabet: 'A-Z Kombinationen',
            comparison: 'Vergleiche & Alternativen',
            action: 'Aktionen & Tutorials',
            attribute: 'Attribute & Qualität',
            time: 'Zeit & Versionen',
            feature: 'Funktionen & Einstellungen',
            question: 'Fragen & Abfragen',
            download: 'Downloads & Installation',
            review: 'Bewertungen & Ratings',
            problem: 'Probleme & Lösungen',
            business: 'Business & Preise'
        }
    },
    fr: {
        title: "Explorateur de Mots-clés",
        inputPlaceholder: "Entrez un mot-clé à explorer...",
        exploreButton: "Explorer",
        backLink: "← Retour à SearchKit",
        categoryNames: {
            base: 'Suggestions de Base',
            alphabet: 'Combinaisons A-Z',
            comparison: 'Comparaisons et Alternatives',
            action: 'Actions et Tutoriels',
            attribute: 'Attributs et Qualité',
            time: 'Temps et Versions',
            feature: 'Fonctionnalités et Paramètres',
            question: 'Questions et Requêtes',
            download: 'Téléchargements et Installation',
            review: 'Avis et Évaluations',
            problem: 'Problèmes et Solutions',
            business: 'Business et Prix'
        }
    }
};

// 将 explorerTranslations 添加到现有的 languages 对象中
Object.keys(languages).forEach(lang => {
    languages[lang].explorer = explorerTranslations[lang] || explorerTranslations.en;
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { languages, searchTools };
}
