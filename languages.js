const searchTools = [
    { name: "exactMatch", prefix: '"', suffix: '"' },
    { name: "exclude", prefix: "-" },
    { name: "siteSearch", prefix: "site:" },
    { name: "fileType", prefix: "filetype:" },
    { name: "orSearch", infix: " OR " },
    { name: "titleSearch", prefix: "intitle:" },
    { name: "bodySearch", prefix: "intext:" },
    { name: "urlSearch", prefix: "inurl:" },
    { name: "relatedSites", prefix: "related:" },
    { name: "cache", prefix: "cache:" },
    { name: "synonyms", prefix: "~" },
    { name: "numberRange", infix: ".." },
    { name: "define", prefix: "define:" },
    { name: "calculator", prefix: "=" },
    { name: "unitConversion", infix: " in " },
    { name: "scholarSearch", prefix: "scholar:" },
    { name: "newsSearch", prefix: "news:" },
    { name: "imageSearch", prefix: "image:" },
    { name: "patentSearch", prefix: "patent:" },
    { name: "trendSearch", prefix: "trends:" },
    { name: "citationSearch", prefix: "cite:" },
    { name: "hashtagSearch", prefix: "#" },
    { name: "locationSearch", prefix: "location:" },
    { name: "timeRangeSearch", prefix: "daterange:" },
    { name: "similarSites", prefix: "" },
    { name: "commonCrawl", prefix: "commoncrawl:" },
    { name: "iconSearch", prefix: "", suffix: " icon filetype:png" },
    { name: "youtubeDownload", prefix: "https://www.99x.", suffix: "" },
    { name: "demandSearch", prefix: "", suffix: " online" }
];

const languages = {
    zh: {
        title: "高级搜索助手",
        searchPlaceholder: "输入搜索词...",
        searchButton: "搜索",
        defaultTip: "输入搜索词，或点击上方按钮使用高级搜索技巧",
        tipPrefix: "提示：",
        userTypes: {
            general: "普通户",
            researcher: "学术研究者",
            dataAnalyst: "数据分析师",
            investigativeJournalist: "调查记者",
            marketResearcher: "市场研究员",
            legalProfessional: "法律专业人士"
        },
        tools: {
            exactMatch: {
                name: "精确匹配",
                description: "使用引号进行精确短语搜索"
            },
            exclude: {
                name: "排除词",
                description: "使用减号排除包含特定词的结果"
            },
            siteSearch: {
                name: "站内搜索",
                description: "在特定网站内搜索"
            },
            fileType: {
                name: "文件类型",
                description: "搜索特定类型的文件"
            },
            orSearch: {
                name: "或搜索",
                description: "搜索多个关键词的任意一个"
            },
            similarSites: {
                name: "同类网站",
                description: "使用多个免费API查找与输入网站相似的其他网站",
                suggestion: "输入一个网站的URL，然后点击此按钮查找相似网站。"
            },
            scholarSearch: {
                name: "学术搜索",
                description: "在Google Scholar中搜索学术文献"
            },
            citationSearch: {
                name: "引用搜索",
                description: "查找引用特定文章的其他文章"
            },
            timeRangeSearch: {
                name: "时间范围搜索",
                description: "在特定时间范围内搜索"
            },
            define: {
                name: "定义",
                description: "查找词语或短语的定义"
            },
            patentSearch: {
                name: "专利搜索",
                description: "搜索相关专利"
            },
            numberRange: {
                name: "数字范围",
                description: "搜索特定数字范围内的结果"
            },
            calculator: {
                name: "计算器",
                description: "进行简单的数学计算"
            },
            trendSearch: {
                name: "趋势搜索",
                description: "查看特定主题的搜索趋势"
            },
            imageSearch: {
                name: "图片搜索",
                description: "搜索特定的图片"
            },
            locationSearch: {
                name: "位置搜索",
                description: "搜索特定位置的信息"
            },
            newsSearch: {
                name: "新闻搜索",
                description: "搜索最新新闻"
            },
            cache: {
                name: "缓存",
                description: "查看网页的缓存版本"
            },
            relatedSites: {
                name: "相关网站",
                description: "查找与特定网站相关的其他网站"
            },
            urlSearch: {
                name: "URL搜索",
                description: "搜索包含特定URL的页面"
            },
            hashtagSearch: {
                name: "话题标签搜索",
                description: "搜索特定话题标签的内容"
            },
            commonCrawl: {
                name: "CommonCrawl 搜索",
                description: "使用 CommonCrawl 索引搜索相关网站",
                suggestion: "输入一个域名，然后点击此按钮查找相关网站。"
            },
            iconSearch: {
                name: "图标搜索",
                description: "快速搜索相关图标（自动添加 icon filetype:png）",
                suggestion: "输入关键词，点击此按钮快速搜索相关图标。支持其他格式如 filetype:jpg"
            },
            youtubeDownload: {
                name: "YouTube下载",
                description: "下载高清YouTube视频（自动转换为99x下载链接）",
                suggestion: "输入YouTube视频链接，点击此按钮转到下载页面"
            },
            demandSearch: {
                name: "需求搜索",
                description: "快速搜索相关需求（自动添加 online 关键词）",
                suggestion: "输入关键词，点击此按钮快速搜索相关需求"
            }
        },
        invalidYoutubeUrl: "请输入有效的YouTube视频链接",
        enterYoutubeUrl: "请输入YouTube视频链接"
    },
    en: {
        title: "Advanced Search Assistant",
        searchPlaceholder: "Enter search terms...",
        searchButton: "Search",
        defaultTip: "Enter search terms, or click the buttons above to use advanced search techniques",
        tipPrefix: "Tip: ",
        userTypes: {
            general: "General User",
            researcher: "Researcher",
            contentCreator: "Content Creator",
            seo: "SEO Professional"
        },
        tools: {
            exactMatch: { name: "Exact Match", description: "Use quotes for exact phrase matching" },
            exclude: { name: "Exclude", description: "Use minus sign to exclude words" },
            siteSearch: { name: "Site Search", description: "Search within a specific website, e.g., site:example.com" },
            fileType: { name: "File Type", description: "Search for specific file types, e.g., filetype:pdf" },
            orSearch: { name: "OR Search", description: "Search for one term or another" },
            titleSearch: { name: "Title Search", description: "Search for pages with specific words in the title" },
            bodySearch: { name: "Body Search", description: "Search for pages with specific words in the body" },
            urlSearch: { name: "URL Search", description: "Search for pages with specific words in the URL" },
            relatedSites: { name: "Related Sites", description: "Find sites related to a specific URL" },
            cache: { name: "Cache", description: "View the cached version of a web page" },
            synonyms: { name: "Synonyms", description: "Include synonyms in search results" },
            numberRange: { name: "Number Range", description: "Search for a range of numbers, e.g., 100..200" },
            define: { name: "Define", description: "Look up the definition of a word" },
            calculator: { name: "Calculator", description: "Use Google as a calculator, e.g., =2+2" },
            unitConversion: { name: "Unit Conversion", description: "Convert units, e.g., 1 USD in CNY" },
            scholarSearch: { name: "Scholar Search", description: "Search scholarly literature in Google Scholar" },
            newsSearch: { name: "News Search", description: "Search for the latest news" },
            imageSearch: { name: "Image Search", description: "Search for related images" },
            patentSearch: { name: "Patent Search", description: "Search for related patents" },
            trendSearch: { name: "Trend Search", description: "View the trend of a search term" },
            citationSearch: { name: "Citation Search", description: "Find other articles citing a specific article" },
            hashtagSearch: { name: "Hashtag Search", description: "Search for specific hashtags" },
            locationSearch: { name: "Location Search", description: "Search for information about a specific location" },
            timeRangeSearch: { name: "Time Range Search", description: "Search within a specific time range" },
            commonCrawl: {
                name: "CommonCrawl Search",
                description: "Search for related sites using CommonCrawl index",
                suggestion: "Enter a domain name and click this button to find related sites."
            },
            iconSearch: {
                name: "Icon Search",
                description: "Quickly search for related icons (automatically adds 'icon png' keywords)",
                suggestion: "Enter keywords and click this button to quickly search for related icons"
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Download HD YouTube videos (converts to 99x download link)",
                suggestion: "Enter YouTube video link and click this button to go to download page"
            },
            demandSearch: {
                name: "Demand Search",
                description: "Quickly search for related demands (automatically adds 'online' keyword)",
                suggestion: "Enter keywords and click this button to quickly search for related demands"
            }
        },
        invalidYoutubeUrl: "Please enter a valid YouTube video URL",
        enterYoutubeUrl: "Please enter a YouTube video URL"
    },
    ja: {
        title: "高度な検索アシスタント",
        searchPlaceholder: "検索語を入力...",
        searchButton: "検索",
        defaultTip: "検索語を入力するか、上のボタンをクリックして高度な検索テクニックを使用してください",
        tipPrefix: "ヒント：",
        userTypes: {
            general: "一般ユーザー",
            researcher: "研究者",
            contentCreator: "コンテンツクリエーター",
            seo: "SEOプロフェッショナル"
        },
        tools: {
            exactMatch: { name: "完全一致", description: "引用符を使用して正確なフレーズ検索を行います" },
            exclude: { name: "除外", description: "マイナス記号を使用して単語を除外します" },
            siteSearch: { name: "サイト内検索", description: "特定のウェブサイト内で検索します。例：site:example.com" },
            fileType: { name: "ファイルタイプ", description: "特定のファイルタイプを検索します。例：filetype:pdf" },
            orSearch: { name: "OR検索", description: "複数のキーワードのいずれかを検索します" },
            titleSearch: { name: "タイトル検索", description: "タイトルに特定の単語を含むページを検索します" },
            bodySearch: { name: "本文検索", description: "本文に特定の単語を含むページを検索します" },
            urlSearch: { name: "URL検索", description: "URLに特定の単語を含むページを検索します" },
            relatedSites: { name: "関連サイト", description: "特定のURLに関連するサイトを見つけます" },
            cache: { name: "キャッシュ", description: "ウェブページのキャッシュバージョンを表示します" },
            synonyms: { name: "義語", description: "検索結果に同義語を含めます" },
            numberRange: { name: "数値範囲", description: "数値の範囲を検索します。例：100..200" },
            define: { name: "定義", description: "単語の定義を調べます" },
            calculator: { name: "電卓", description: "Googleを電卓として使用します。例：=2+2" },
            unitConversion: { name: "単位変換", description: "単位を変換します。例：1 USD in JPY" },
            scholarSearch: { name: "学術検索", description: "Google Scholarで学術文献を検索" },
            newsSearch: { name: "ニュース検索", description: "最新のニュースを検索" },
            imageSearch: { name: "画像検索", description: "関連する画像を検索" },
            patentSearch: { name: "特許検索", description: "関連する特許を検索" },
            trendSearch: { name: "トレンド検索", description: "検索キーワードのトレンドを確認" },
            citationSearch: { name: "引用検索", description: "特定の記事を引用した他の記事を見つける" },
            hashtagSearch: { name: "ハッシュタグ検索", description: "特定のハッシュタグを検索" },
            locationSearch: { name: "位置検索", description: "特定の位置に関する情報を検索" },
            timeRangeSearch: { name: "時間範囲検索", description: "特定の時間範囲内で検索" },
            commonCrawl: {
                name: "CommonCrawl 検索",
                description: "CommonCrawl インデックスを使用して関連サイトを検索",
                suggestion: "ドメイン名を入力してこのボタンをクリックして関連サイトを検索します。"
            },
            iconSearch: {
                name: "Icon Search",
                description: "Quickly search for related icons (automatically adds 'icon png' keywords)",
                suggestion: "Enter keywords and click this button to quickly search for related icons"
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Download HD YouTube videos (converts to 99x download link)",
                suggestion: "Enter YouTube video link and click this button to go to download page"
            },
            demandSearch: {
                name: "需求搜索",
                description: "快速搜索相关需求（自动添加 online 关键词）",
                suggestion: "输入关键词，点击此按钮快速搜索相关需求"
            }
        }
    },
    es: {
        title: "Asistente de Búsqueda Avanzada",
        searchPlaceholder: "Ingrese términos de búsqueda...",
        searchButton: "Buscar",
        defaultTip: "Ingrese términos de búsqueda o haga clic en los botones de arriba para usar técnicas de búsqueda avanzada",
        tipPrefix: "Consejo: ",
        userTypes: {
            general: "Usuario General",
            researcher: "Investigador",
            contentCreator: "Creador de Contenido",
            seo: "Profesional SEO"
        },
        tools: {
            exactMatch: { name: "Coincidencia Exacta", description: "Use comillas para buscar frases exactas" },
            exclude: { name: "Excluir", description: "Use el signo menos para excluir palabras" },
            siteSearch: { name: "Búsqueda en Sitio", description: "Busque dentro de un sitio web específico, ej: site:example.com" },
            fileType: { name: "Tipo de Archivo", description: "Busque tipos de archivo específicos, ej: filetype:pdf" },
            orSearch: { name: "Búsqueda OR", description: "Busque un término u otro" },
            titleSearch: { name: "Búsqueda en Título", description: "Busque páginas con palabras específicas en el título" },
            bodySearch: { name: "Búsqueda en Cuerpo", description: "Busque páginas con palabras específicas en el cuerpo" },
            urlSearch: { name: "Búsqueda en URL", description: "Busque páginas con palabras específicas en la URL" },
            relatedSites: { name: "Sitios Relacionados", description: "Encuentre sitios relacionados con una URL específica" },
            cache: { name: "Caché", description: "Vea la versión en caché de una página web" },
            synonyms: { name: "Sinónimos", description: "Incluya sinónimos en los resultados de búsqueda" },
            numberRange: { name: "Rango Numérico", description: "Busque un rango de números, ej: 100..200" },
            define: { name: "Definir", description: "Busque la definición de una palabra" },
            calculator: { name: "Calculadora", description: "Use Google como calculadora, ej: =2+2" },
            unitConversion: { name: "Conversión de Unidades", description: "Convierta unidades, ej: 1 USD in EUR" },
            scholarSearch: { name: "Búsqueda Académica", description: "Buscar literatura académica en Google Scholar" },
            newsSearch: { name: "Búsqueda de Noticias", description: "Buscar las noticias más recientes" },
            imageSearch: { name: "Búsqueda de Imágenes", description: "Buscar imágenes relacionadas" },
            patentSearch: { name: "Búsqueda de Patentes", description: "Buscar patentes relacionadas" },
            trendSearch: { name: "Búsqueda de Tendencias", description: "Ver la tendencia de un término de búsqueda" },
            citationSearch: { name: "Búsqueda de Citas", description: "Buscar otros artículos que citan un artículo específico" },
            hashtagSearch: { name: "Búsqueda de Etiquetas de Hashtag", description: "Buscar etiquetas de hashtag específicas" },
            locationSearch: { name: "Búsqueda de Ubicación", description: "Buscar información sobre una ubicación específica" },
            timeRangeSearch: { name: "Búsqueda de Rango de Tiempo", description: "Buscar dentro de un rango de tiempo específico" },
            commonCrawl: {
                name: "Búsqueda de CommonCrawl",
                description: "Buscar sitios relacionados usando el índice de CommonCrawl",
                suggestion: "Ingrese un nombre de dominio y haga clic en este botón para buscar sitios relacionados."
            },
            iconSearch: {
                name: "Icon Search",
                description: "Quickly search for related icons (automatically adds 'icon png' keywords)",
                suggestion: "Enter keywords and click this button to quickly search for related icons"
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Download HD YouTube videos (converts to 99x download link)",
                suggestion: "Enter YouTube video link and click this button to go to download page"
            },
            demandSearch: {
                name: "需求搜索",
                description: "快速搜索相关需求（自动添加 online 关键词）",
                suggestion: "输入关键词，点击此按钮快速搜索相关需求"
            }
        }
    },
    ko: {
        title: "고급 검색 도우미",
        searchPlaceholder: "검색어를 입력하세요...",
        searchButton: "검색",
        defaultTip: "검색어를 입력하거나 위의 버튼을 클릭하여 고급 검색 기술을 사용하세요",
        tipPrefix: "팁: ",
        userTypes: {
            general: "일반 사용자",
            researcher: "연구자",
            contentCreator: "콘텐츠 크리에이터",
            seo: "SEO 전문가"
        },
        tools: {
            exactMatch: { name: "정확한 일치", description: "정확한 구문 검색을 위해 따옴표를 사용하세요" },
            exclude: { name: "제외", description: "단어를 제외하려면 빼기 기호를 사용하세요" },
            siteSearch: { name: "사이트 검색", description: "특정 웹사이트 내에서 검색, 예: site:example.com" },
            fileType: { name: "파일 유형", description: "특정 파일 유형 검색, 예: filetype:pdf" },
            orSearch: { name: "OR 검색", description: "하나 또는 다른 용어 검색" },
            titleSearch: { name: "제목 검색", description: "제목에 특정 단어가 포함된 페이지 검색" },
            bodySearch: { name: "본문 검색", description: "본문에 특정 단어가 포함된 페이지 색" },
            urlSearch: { name: "URL 검색", description: "URL에 특정 단어가 포함된 페이지 검색" },
            relatedSites: { name: "관련 사이트", description: "특정 URL과 관련된 사이트 찾기" },
            cache: { name: "캐시", description: "웹 페이지의 캐시 버전 보기" },
            synonyms: { name: "동의어", description: "검색 결과에 동의어 포함" },
            numberRange: { name: "숫자 범위", description: "숫자 범위 검색, 예: 100..200" },
            define: { name: "정의", description: "단어의 정의 찾기" },
            calculator: { name: "계산기", description: "Google을 계산기로 사용, 예: =2+2" },
            unitConversion: { name: "단위 변환", description: "단위 변환, 예: 1 USD in KRW" },
            scholarSearch: { name: "학술 검색", description: "Google Scholar에서 학술 문헌을 검색" },
            newsSearch: { name: "뉴스 검색", description: "최신 뉴스 검색" },
            imageSearch: { name: "이미지 검색", description: "관련된 이미지 검색" },
            patentSearch: { name: "특허 검색", description: "관련된 특허 검색" },
            trendSearch: { name: "트렌드 검색", description: "검색 키워드의 트렌드 확인" },
            citationSearch: { name: "인용 검색", description: "특정 문헌을 인용한 다른 문헌 찾기" },
            hashtagSearch: { name: "해시태그 검색", description: "특정 시태그 검색" },
            locationSearch: { name: "위치 검색", description: "특정 위치에 대한 정보 검색" },
            timeRangeSearch: { name: "시간 범위 검색", description: "특정 시간 범위 내에서 검" },
            commonCrawl: {
                name: "CommonCrawl 검색",
                description: "CommonCrawl 인덱스를 사용하여 관련 사이트 검색",
                suggestion: "도메인 이름을 입력하고 이 버튼을 클릭하여 관련 사이트를 검색할 수 있습니다."
            },
            iconSearch: {
                name: "Icon Search",
                description: "Quickly search for related icons (automatically adds 'icon png' keywords)",
                suggestion: "Enter keywords and click this button to quickly search for related icons"
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Download HD YouTube videos (converts to 99x download link)",
                suggestion: "Enter YouTube video link and click this button to go to download page"
            },
            demandSearch: {
                name: "需求搜索",
                description: "快速搜索相关需求（自动添加 online 关键词）",
                suggestion: "输入关键词，点击此按钮快速搜索相关需求"
            }
        }
    },
    de: {
        title: "Erweiterter Suchassisstent",
        searchPlaceholder: "Suchbegriffe eingeben...",
        searchButton: "Suchen",
        defaultTip: "Geben Sie Suchbegriffe ein oder klicken Sie auf die Schaltflächen oben, um erweiterte Suchtechniken zu verwenden",
        tipPrefix: "Tipp: ",
        userTypes: {
            general: "Allgemeiner Benutzer",
            researcher: "Forscher",
            contentCreator: "Inhaltskreator",
            seo: "SEO-Fachmann"
        },
        tools: {
            exactMatch: { name: "Exakte Übereinstimmung", description: "Verwenden Sie Anführungszeichen für die exakte Phrasensuche" },
            exclude: { name: "Ausschließen", description: "Verwenden Sie das Minuszeichen, um Wörter auszuschließen" },
            siteSearch: { name: "Seitensuche", description: "Suche innerhalb einer bestimmten Website, z.B. site:example.com" },
            fileType: { name: "Dateityp", description: "Suche nach bestimmten Dateitypen, z.B. filetype:pdf" },
            orSearch: { name: "ODER-Suche", description: "Suche nach einem Begriff oder einem anderen" },
            titleSearch: { name: "Titelsuche", description: "Suche nach Seiten mit bestimmten Wörtern im Titel" },
            bodySearch: { name: "Textsuche", description: "Suche nach Seiten mit bestimmten Wörtern im Text" },
            urlSearch: { name: "URL-Suche", description: "Suche nach Seiten mit bestimmten Wörtern in der URL" },
            relatedSites: { name: "Verwandte Seiten", description: "Finden Sie Seiten, die mit einer bestimmten URL verwandt sind" },
            cache: { name: "Cache", description: "Zeigen Sie die zwischengespeicherte Version einer Webseite an" },
            synonyms: { name: "Synonyme", description: "Schließen Sie Synonyme in die Suchergebnisse ein" },
            numberRange: { name: "Zahlenbereich", description: "Suche nach einem Zahlenbereich, z.B. 100..200" },
            define: { name: "Definition", description: "Schlagen Sie die Definition eines Wortes nach" },
            calculator: { name: "Taschenrechner", description: "Verwenden Sie Google als Taschenrechner, z.B. =2+2" },
            unitConversion: { name: "Einheitenumrechnung", description: "Rechnen Sie Einheiten um, z.B. 1 USD in EUR" },
            scholarSearch: { name: "Akademische Suche", description: "Suche nach akademischen Literatur in Google Scholar" },
            newsSearch: { name: "Nachrichtensuche", description: "Suche nach den neuesten Nachrichten" },
            imageSearch: { name: "Bildersuche", description: "Suche nach verwandten Bildern" },
            patentSearch: { name: "Patentensuche", description: "Suche nach verwandten Patenten" },
            trendSearch: { name: "Trendsuche", description: "Trend einer Suchanfrage anzeigen" },
            citationSearch: { name: "Zitatsuche", description: "Suchen Sie andere Artikel, die einen bestimmten Artikel zitieren" },
            hashtagSearch: { name: "Hashtag-Suche", description: "Suche nach spezifischen Hashtags" },
            locationSearch: { name: "Standort-Suche", description: "Suche nach Informationen zu einer bestimmten Standort" },
            timeRangeSearch: { name: "Zeitbereichssuche", description: "Suche innerhalb eines bestimmten Zeitbereichs" },
            commonCrawl: {
                name: "CommonCrawl-Suche",
                description: "Suche nach verwandten Websites mit CommonCrawl-Index",
                suggestion: "Geben Sie einen Domainnamen ein und klicken Sie diesen Button, um verwandte Websites zu finden."
            },
            iconSearch: {
                name: "Icon Search",
                description: "Quickly search for related icons (automatically adds 'icon png' keywords)",
                suggestion: "Geben Sie einen Domainnamen ein und klicken Sie diesen Button, um verwandte Websites zu finden."
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Download HD YouTube videos (converts to 99x download link)",
                suggestion: "Enter YouTube video link and click this button to go to download page"
            },
            demandSearch: {
                name: "需求搜索",
                description: "快速搜索相关需求（自动添加 online 关键词）",
                suggestion: "输入关键词，点击此按钮快速搜索相关需求"
            }
        }
    },
    fr: {
        title: "Assistant de Recherche Avancée",
        searchPlaceholder: "Entrez les termes de recherche...",
        searchButton: "Rechercher",
        defaultTip: "Entrez les termes de recherche ou cliquez sur les boutons ci-dessus pour utiliser les techniques de recherche avancée",
        tipPrefix: "Astuce : ",
        userTypes: {
            general: "Utilisateur Général",
            researcher: "Chercheur",
            contentCreator: "Créateur de Contenu",
            seo: "SEO Professionnel"
        },
        tools: {
            exactMatch: { name: "Correspondance Exacte", description: "Utilisez des guillemets pour une recherche de phrase exacte" },
            exclude: { name: "Exclure", description: "Utilisez le signe moins pour exclure des mots" },
            siteSearch: { name: "Recherche sur le Site", description: "Recherchez dans un site web spécifique, ex : site:example.com" },
            fileType: { name: "Type de Fichier", description: "Recherchez des types de fichiers spécifiques, ex : filetype:pdf" },
            orSearch: { name: "Recherche OU", description: "Recherchez un terme ou un autre" },
            titleSearch: { name: "Recherche dans le Titre", description: "Recherchez des pages avec des mots spécifiques dans le titre" },
            bodySearch: { name: "Recherche dans le Corps", description: "Recherchez des pages avec des mots spécifiques dans le corps" },
            urlSearch: { name: "Recherche dans l'URL", description: "Recherchez des pages avec des mots spécifiques dans l'URL" },
            relatedSites: { name: "Sites Connexes", description: "Trouvez des sites liés à une URL spécifique" },
            cache: { name: "Cache", description: "Affichez la version en cache d'une page web" },
            synonyms: { name: "Synonymes", description: "Incluez des synonymes dans les résultats de recherche" },
            numberRange: { name: "Plage Numérique", description: "Recherchez une plage de nombres, ex : 100..200" },
            define: { name: "Définir", description: "Recherchez la définition d'un mot" },
            calculator: { name: "Calculatrice", description: "Utilisez Google comme calculatrice, ex : =2+2" },
            unitConversion: { name: "Conversion d'Unités", description: "Convertissez des unités, ex : 1 USD en EUR" },
            scholarSearch: { name: "Recherche Académique", description: "Recherchez de la littérature académique dans Google Scholar" },
            newsSearch: { name: "Recherche de Nouvelles", description: "Recherchez les dernières nouvelles" },
            imageSearch: { name: "Recherche d'Images", description: "Recherchez des images associées" },
            patentSearch: { name: "Recherche de Brevets", description: "Recherchez des brevets associés" },
            trendSearch: { name: "Recherche de Tendances", description: "Affichez la tendance d'une requête de recherche" },
            citationSearch: { name: "Recherche de Citations", description: "Trouvez d'autres articles qui citent un article spécifique" },
            hashtagSearch: { name: "Recherche de Hashtags", description: "Recherchez des hashtags spécifiques" },
            locationSearch: { name: "Recherche de Lieux", description: "Recherchez des informations sur un lieu spécifique" },
            timeRangeSearch: { name: "Recherche de Plage de Temps", description: "Recherchez à l'intérieur d'une plage de temps spécifique" },
            commonCrawl: {
                name: "Recherche de CommonCrawl",
                description: "Recherchez des sites liés en utilisant l'index de CommonCrawl",
                suggestion: "Entrez un nom de domaine et cliquez sur ce bouton pour trouver des sites liés."
            },
            iconSearch: {
                name: "Icon Search",
                description: "Quickly search for related icons (automatically adds 'icon png' keywords)",
                suggestion: "Entrez un nom de domaine et cliquez sur ce bouton pour trouver des sites liés."
            },
            youtubeDownload: {
                name: "YouTube Download",
                description: "Download HD YouTube videos (converts to 99x download link)",
                suggestion: "Enter YouTube video link and click this button to go to download page"
            },
            demandSearch: {
                name: "需求搜索",
                description: "快速搜索相关需求（自动添加 online 关键词）",
                suggestion: "输入关键词，点击此按钮快速搜索相关需求"
            }
        }
    }
};

