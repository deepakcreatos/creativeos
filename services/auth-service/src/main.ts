import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS since the web-client needs to talk to this service
  app.enableCors();
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Auth Service is running on: http://localhost:${port}`);
}
bootstrap();
