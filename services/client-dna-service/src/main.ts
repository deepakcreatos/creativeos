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

  // CRITICAL FIX: Do NOT use `process.env.PORT` here!
  // Railway universally injects `PORT=3000` across the entire container.
  // The API-Gateway is the public border node and must claim `process.env.PORT`
  // so the external router works correctly. This DNA service is purely internal
  // and MUST strictly run on 3002 to avoid EADDRINUSE collisions.
  const port = 3002;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Client DNA Service running internally on port ${port}`);
}

bootstrap();