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
  const DNA_SERVICE   = process.env.DNA_SERVICE_URL   || 'http://localhost:3002';
  const AUTH_SERVICE  = process.env.AUTH_SERVICE_URL  || 'http://localhost:3001';
  const STRAT_SERVICE = process.env.STRAT_SERVICE_URL || 'http://localhost:3003';
  const CONT_SERVICE  = process.env.CONT_SERVICE_URL  || 'http://localhost:3004';
  const MEDIA_SERVICE = process.env.MEDIA_SERVICE_URL || 'http://localhost:3005';
  const REV_SERVICE   = process.env.REV_SERVICE_URL   || 'http://localhost:3006';
  const APPR_SERVICE  = process.env.APPR_SERVICE_URL  || 'http://localhost:3007';
  const SCHE_SERVICE  = process.env.SCHE_SERVICE_URL  || 'http://localhost:3008';
  const ANAL_SERVICE  = process.env.ANAL_SERVICE_URL  || 'http://localhost:3009';
  const BILL_SERVICE  = process.env.BILL_SERVICE_URL  || 'http://localhost:3010';
  const VOIC_SERVICE  = process.env.VOIC_SERVICE_URL  || 'http://localhost:3011';
  const KNOW_SERVICE  = process.env.KNOW_SERVICE_URL  || 'http://localhost:3012';
  const AUDI_SERVICE  = process.env.AUDI_SERVICE_URL  || 'http://localhost:3013';

  const routes: Array<{ path: string, target: string, rewrite?: Record<string, string> }> = [
    { path: '/api/dna', target: DNA_SERVICE },
    { path: '/api/campaigns', target: DNA_SERVICE },
    { path: '/api/strategy', target: STRAT_SERVICE, rewrite: { '^/api/strategy': '/strategy' } },
    { path: '/api/content', target: CONT_SERVICE, rewrite: { '^/api/content': '/content' } },
    { path: '/api/media', target: MEDIA_SERVICE, rewrite: { '^/api/media': '/media' } },
    { path: '/api/revision', target: REV_SERVICE, rewrite: { '^/api/revision': '/revision' } },
    { path: '/api/approval', target: APPR_SERVICE, rewrite: { '^/api/approval': '/approval' } },
    { path: '/api/scheduler', target: SCHE_SERVICE, rewrite: { '^/api/scheduler': '/scheduler' } },
    { path: '/api/analytics', target: ANAL_SERVICE, rewrite: { '^/api/analytics': '/analytics' } },
    { path: '/api/billing', target: BILL_SERVICE, rewrite: { '^/api/billing': '/billing' } },
    { path: '/api/voice', target: VOIC_SERVICE, rewrite: { '^/api/voice': '/voice' } },
    { path: '/api/knowledge', target: KNOW_SERVICE, rewrite: { '^/api/knowledge': '/graph' } },
    { path: '/api/audit', target: AUDI_SERVICE },
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
