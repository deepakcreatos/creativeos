import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ReverseProxyMiddleware implements NestMiddleware {
    private proxy = createProxyMiddleware({
        target: 'http://localhost:3002',
        changeOrigin: true,
        pathRewrite: {
            '^/api/dna': '/api/dna', // Forward /api/dna to service /api/dna
            '^/api/campaigns': '/api/campaigns',
        },
    });

    use(req: any, res: any, next: () => void) {
        this.proxy(req, res, next);
    }
}
