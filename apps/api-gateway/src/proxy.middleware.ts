import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ReverseProxyMiddleware implements NestMiddleware {
    private proxy = createProxyMiddleware({
        target: 'http://localhost:3002', // Default (Node 1)
        router: {
            '/api/dna': 'http://localhost:3002',
            '/api/strategy': 'http://localhost:3003',
            '/api/content': 'http://localhost:3004',
            '/api/media': 'http://localhost:3005',
            '/api/revision': 'http://localhost:3006',
            '/api/approval': 'http://localhost:3007',
            '/api/scheduler': 'http://localhost:3008',
            '/api/analytics': 'http://localhost:3009',
            '/api/billing': 'http://localhost:3010',
            '/api/voice': 'http://localhost:3011',
            '/api/knowledge': 'http://localhost:3012',
            '/api/audit': 'http://localhost:3013',
        },
        changeOrigin: true,
        pathRewrite: {
            '^/api/dna': '/dna',
            '^/api/strategy': '/strategy',
            '^/api/content': '/content',
            '^/api/media': '/media',
            '^/api/revision': '/revision',
            '^/api/approval': '/approval',
            '^/api/scheduler': '/scheduler',
            '^/api/analytics': '/analytics',
            '^/api/billing': '/billing',
            '^/api/voice': '/voice',
            '^/api/knowledge': '/graph',
        },
    });

    use(req: any, res: any, next: () => void) {
        this.proxy(req, res, next);
    }
}
