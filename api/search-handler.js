const { Client } = require('@elastic/elasticsearch');
const config = require('../config/config');

class SearchHandler {
    constructor() {
        this.client = new Client({
            node: 'http://localhost:9200'
        });
        this.cache = new Map();
    }

    async search(keyword) {
        try {
            // 检查缓存
            const cachedResults = this.getCachedResults(keyword);
            if (cachedResults) return cachedResults;

            const response = await this.client.search({
                index: config.elasticsearch.index,
                body: {
                    query: {
                        multi_match: {
                            query: keyword,
                            fields: ['title^2', 'content'],
                            type: 'best_fields',
                            fuzziness: 'AUTO'
                        }
                    },
                    highlight: {
                        fields: {
                            title: {},
                            content: {}
                        }
                    },
                    size: 10
                }
            });

            const results = this.formatSearchResults(response);
            
            // 存入缓存
            this.setCachedResults(keyword, results);
            
            return results;
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }

    formatSearchResults(response) {
        return response.hits.hits.map(hit => ({
            _id: hit._id,
            _score: hit._score,
            _source: {
                title: hit._source.title,
                content: hit._source.content,
                url: hit._source.url
            },
            highlight: hit.highlight
        }));
    }

    getCachedResults(keyword) {
        if (this.cache.has(keyword)) {
            const { timestamp, data } = this.cache.get(keyword);
            if (Date.now() - timestamp < config.cache.ttl) {
                return data;
            }
            this.cache.delete(keyword);
        }
        return null;
    }

    setCachedResults(keyword, results) {
        this.cache.set(keyword, {
            timestamp: Date.now(),
            data: results
        });
    }
}

module.exports = new SearchHandler(); 