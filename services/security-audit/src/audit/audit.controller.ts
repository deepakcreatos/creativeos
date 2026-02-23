import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('/')
  async logEvent(@Body() eventData: any) {
    return this.auditService.logEvent(eventData);
  }

  @Get('/')
  async getLogs() {
    return this.auditService.getRecentLogs();
  }
}
