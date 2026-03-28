import { Controller, Get, Param, All } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @All('debug-gateway')
  debug() {
    return { status: 'GATEWAY_IS_LIVE_AND_UPDATED', ok: true };
  }
}
