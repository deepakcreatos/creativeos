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
  // Strict manual route interception guarantees HPM actually proxies the payload instead of skipping 
  // it due to `pathFilter` matching bugs throwing a false-positive NestJS 404.
  app.use((req: any, res: any, next: any) => {
    console.log(`[GATEWAY] Intercepting: ${req.method} ${req.url}`);

    if (req.url.startsWith('/api/dna') || req.url.startsWith('/api/campaigns')) {
      return createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true })(req, res, next);
    }
    if (req.url.startsWith('/api/strategy')) {
      return createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true, pathRewrite: { '^/api/strategy': '/strategy' } })(req, res, next);
    }
    if (req.url.startsWith('/api/content')) {
      return createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true, pathRewrite: { '^/api/content': '/content' } })(req, res, next);
    }
    if (req.url.startsWith('/api/media')) {
      return createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true, pathRewrite: { '^/api/media': '/media' } })(req, res, next);
    }

    // Fallback if not intercepted
    next();
  });


  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();
