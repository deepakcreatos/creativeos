import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Unconditional CORS Interceptor for Vercel/Railway
  app.use((req: any, res: any, next: any) => {
    const origin = req.headers.origin || '*';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    next();
  });
  const routes: Array<{ path: string, target: string, rewrite?: Record<string, string> }> = [
    { path: '/api/dna', target: 'http://localhost:3002' },
    { path: '/api/campaigns', target: 'http://localhost:3002' },
    { path: '/api/strategy', target: 'http://localhost:3003', rewrite: { '^/api/strategy': '/strategy' } },
    { path: '/api/content', target: 'http://localhost:3004', rewrite: { '^/api/content': '/content' } },
    { path: '/api/media', target: 'http://localhost:3005', rewrite: { '^/api/media': '/media' } },
    { path: '/api/revision', target: 'http://localhost:3006', rewrite: { '^/api/revision': '/revision' } },
    { path: '/api/approval', target: 'http://localhost:3007', rewrite: { '^/api/approval': '/approval' } },
    { path: '/api/scheduler', target: 'http://localhost:3008', rewrite: { '^/api/scheduler': '/scheduler' } },
    { path: '/api/analytics', target: 'http://localhost:3009', rewrite: { '^/api/analytics': '/analytics' } },
    { path: '/api/billing', target: 'http://localhost:3010', rewrite: { '^/api/billing': '/billing' } },
    { path: '/api/voice', target: 'http://localhost:3011', rewrite: { '^/api/voice': '/voice' } },
    { path: '/api/knowledge', target: 'http://localhost:3012', rewrite: { '^/api/knowledge': '/graph' } },
    { path: '/api/audit', target: 'http://localhost:3013' },
  ];

  routes.forEach(route => {
    app.use(createProxyMiddleware({
      pathFilter: route.path,
      target: route.target,
      changeOrigin: true,
      ...(route.rewrite ? { pathRewrite: route.rewrite } : {}),
    }));
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();
