import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ReverseProxyMiddleware } from './proxy.middleware';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyMiddleware)
      .forRoutes({ path: 'api/dna*', method: RequestMethod.ALL }, { path: 'api/campaigns*', method: RequestMethod.ALL });
  }
}
