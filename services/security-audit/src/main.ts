import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3013;
  await app.listen(port);
  console.log(`[NODE 12] Security & Audit Service running on port ${port}`);
}
bootstrap();
