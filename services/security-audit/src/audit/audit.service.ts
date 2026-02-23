import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuditService {
  private readonly sysLogger = new Logger(AuditService.name);
  private logs: any[] = [];

  logEvent(eventData: any) {
    this.sysLogger.log(`[NODE 12] Recording Audit Event: ${eventData.action || 'UNKNOWN'}`);
    
    const logEntry = {
      action: eventData.action,
      userId: eventData.userId,
      resource: eventData.resource,
      metadata: eventData.metadata,
      timestamp: new Date().toISOString()
    };
    
    this.logs.push(logEntry);
    console.log(JSON.stringify(logEntry));

    return {
      success: true,
      logged: true,
      timestamp: new Date()
    };
  }

  getRecentLogs() {
     return this.logs;
  }
}
