const fs = require('fs').promises;
const path = require('path');

class SessionStore {
    constructor() {
        this.storePath = path.join(__dirname, '../.sessions');
        this.sessionFile = path.join(this.storePath, 'google-session.json');
    }

    async init() {
        try {
            await fs.mkdir(this.storePath, { recursive: true });
        } catch (error) {
            console.error('Failed to create session directory:', error);
        }
    }

    async saveSession(sessionData) {
        try {
            await fs.writeFile(
                this.sessionFile,
                JSON.stringify(sessionData, null, 2),
                'utf8'
            );
        } catch (error) {
            console.error('Failed to save session:', error);
        }
    }

    async loadSession() {
        try {
            const data = await fs.readFile(this.sessionFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to load session:', error);
            return null;
        }
    }
}

module.exports = new SessionStore(); 