import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // CORS is handled upstream by the API-Gateway Interceptor.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false, // allow extra fields
    }),
  );

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Client DNA Service running on port ${port}`);
}

bootstrap();