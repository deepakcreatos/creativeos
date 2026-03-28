import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use NestJS built-in CORS — handles OPTIONS preflights reliably
  app.enableCors({
    origin: true,                            // mirrors request origin header
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
    allowedHeaders: 'Content-Type, Authorization, Accept',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
  console.log(`🚀 CreativeOS API Gateway live on port ${process.env.PORT ?? 4000}`);
}

void bootstrap();
