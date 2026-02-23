import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Eagerly mount proxy before Nest routing to bypass legacy path-to-regexp issues
  const proxy = createProxyMiddleware({
    router: {
        '/api/dna': 'http://localhost:3002',
        '/api/campaigns': 'http://localhost:3002',
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
        '^/api/campaigns': '/campaigns',
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
        '^/api/audit': '/audit',
    },
  });

  // Apply to all known proxy paths
  const proxyPaths = ['/api/dna', '/api/campaigns', '/api/strategy', '/api/content', '/api/media', '/api/revision', '/api/approval', '/api/scheduler', '/api/analytics', '/api/billing', '/api/voice', '/api/knowledge', '/api/audit'];
  proxyPaths.forEach(path => app.use(path, proxy));

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
