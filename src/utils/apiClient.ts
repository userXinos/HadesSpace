interface Server {
    url: string;
    priority: number;
}

interface ServerConfig {
    servers: Server[];
}

export class ApiClient {
    private activeUrl: string = '';
    private servers: Server[] = [];
    private isInitialized: boolean = false;

    constructor(
        private configUrl: string = 'https://raw.githubusercontent.com/mentalisit/bot_kz/refs/heads/master/servers.json'
    ) {}

    public async getUrl(): Promise<string> {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return this.activeUrl;
    }

    private async initialize(): Promise<void> {
        try {
            const response = await fetch(this.configUrl);
            const config: ServerConfig = await response.json();

            this.servers = config.servers.sort((a, b) => a.priority - b.priority);

            for (const server of this.servers) {
                if (await this.checkServerHealth(server.url)) {
                    this.activeUrl = server.url;
                    this.isInitialized = true;
                    console.log(`Selected server: ${server.url}`);
                    return;
                }
            }

            throw new Error('No available servers found');
        } catch (error) {
            console.error('Failed to initialize API client:', error);
            this.activeUrl = '';
            this.isInitialized = true;
        }
    }

    private async checkServerHealth(baseUrl: string): Promise<boolean> {
        try {
            const healthUrl = `${baseUrl}/ws/health`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут

            const response = await fetch(healthUrl, {
                method: 'GET',
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            return response.ok;
        } catch (error) {
            console.warn(`Server ${baseUrl} health check failed:`, error);
            return false;
        }
    }
}

export const apiClient = new ApiClient();
