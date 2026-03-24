import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // CORS is aggressively handled upstream by the API-Gateway Interceptor.
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