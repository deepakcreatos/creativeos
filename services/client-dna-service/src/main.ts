import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // CORS - Update with your actual Vercel URL
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://creativeos.vercel.app', // ← Replace with YOUR Vercel URL
      /\.vercel\.app$/, // Allow all Vercel preview URLs
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const port = 3002;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 CreativeOS Backend running on port ${port}`);
}

bootstrap();