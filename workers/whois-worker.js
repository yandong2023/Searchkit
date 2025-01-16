// WHOIS 服务器映射
const WHOIS_SERVERS = {
  'com': 'whois.verisign-grs.com',
  'net': 'whois.verisign-grs.com',
  'org': 'whois.pir.org',
  'info': 'whois.afilias.net',
  'biz': 'whois.biz',
  'io': 'whois.nic.io',
  'me': 'whois.nic.me',
  'co': 'whois.nic.co',
  'cn': 'whois.cnnic.cn',
  'jp': 'whois.jprs.jp',
  'uk': 'whois.nic.uk',
  'ru': 'whois.tcinet.ru',
  'de': 'whois.denic.de',
  'nl': 'whois.domain-registry.nl'
};

async function queryWhois(domain, server) {
  // 创建 TCP 连接到 WHOIS 服务器的 43 端口
  const socket = await connect({
    hostname: server,
    port: 43
  });

  const writer = socket.writable.getWriter();
  const encoder = new TextEncoder();
  
  // 发送域名查询请求（域名后跟换行符）
  await writer.write(encoder.encode(domain + '\r\n'));
  await writer.close();

  // 读取响应
  const reader = socket.readable.getReader();
  const decoder = new TextDecoder();
  let response = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    response += decoder.decode(value);
  }

  await socket.close();
  return response;
}

function parseDomain(domain) {
  domain = domain.toLowerCase();
  // 移除 http:// 或 https:// 前缀
  domain = domain.replace(/^https?:\/\//, '');
  // 移除路径和查询参数
  domain = domain.split('/')[0];
  // 移除端口号
  domain = domain.split(':')[0];
  // 移除 www. 前缀
  domain = domain.replace(/^www\./, '');
  
  const parts = domain.split('.');
  return {
    domain: domain,
    tld: parts[parts.length - 1]
  };
}

function parseWhoisData(whoisText) {
  const result = {
    domainName: null,
    registrar: null,
    creationDate: null,
    expirationDate: null,
    updatedDate: null,
    nameServers: [],
    status: [],
    raw: whoisText
  };

  const lines = whoisText.split('\n');
  for (const line of lines) {
    const [key, ...values] = line.split(':').map(s => s.trim());
    const value = values.join(':').trim();

    if (!key || !value) continue;

    const keyLower = key.toLowerCase();
    
    if (keyLower.includes('domain name')) {
      result.domainName = value;
    } else if (keyLower.includes('registrar')) {
      result.registrar = value;
    } else if (keyLower.includes('creation date')) {
      result.creationDate = value;
    } else if (keyLower.includes('expiration date') || keyLower.includes('registry expiry date')) {
      result.expirationDate = value;
    } else if (keyLower.includes('updated date')) {
      result.updatedDate = value;
    } else if (keyLower.includes('name server')) {
      result.nameServers.push(value.toLowerCase());
    } else if (keyLower.includes('status')) {
      result.status.push(value);
    }
  }

  return result;
}

export default {
  async fetch(request, env) {
    try {
      // 只允许 GET 请求
      if (request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
      }

      // 从 URL 获取域名参数
      const url = new URL(request.url);
      const domain = url.searchParams.get('domain');

      if (!domain) {
        return new Response('Domain parameter is required', { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 解析域名和顶级域名
      const { domain: cleanDomain, tld } = parseDomain(domain);
      
      // 获取对应的 WHOIS 服务器
      const whoisServer = WHOIS_SERVERS[tld] || 'whois.verisign-grs.com';

      // 查询 WHOIS 信息
      const whoisResponse = await queryWhois(cleanDomain, whoisServer);
      
      // 解析 WHOIS 数据
      const parsedData = parseWhoisData(whoisResponse);

      // 返回 JSON 响应
      return new Response(JSON.stringify(parsedData), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600' // 缓存1小时
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};
