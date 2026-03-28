import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Unconditional CORS for Vercel → Railway
  app.use((req: any, res: any, next: any) => {
    const origin = (req.headers as any).origin || '*';
    (res as any).header('Access-Control-Allow-Origin', origin);
    (res as any).header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    (res as any).header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    (res as any).header('Access-Control-Allow-Credentials', 'true');
    if ((req as any).method === 'OPTIONS') {
      return (res as any).status(204).end();
    }
    next();
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
  console.log(`🚀 CreativeOS API Gateway live on port ${process.env.PORT ?? 4000}`);
}

void bootstrap();
