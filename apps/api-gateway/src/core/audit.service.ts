import { Injectable, Logger } from '@nestjs/common';
import { IAuditService, AuditLogEntry } from '../../../../shared/core/interfaces/audit.interface';
import { NodeType } from '../../../../shared/core/interfaces/node.interface';

@Injectable()
export class AuditService implements IAuditService {
    private readonly logger = new Logger(AuditService.name);

    async log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
        const auditRecord: AuditLogEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            ...entry,
        };

        // In production, this would write to a WORM (Write Once Read Many) storage or DB table.
        // For now, we log to stdout with a structured format.
        this.logger.log(`[AUDIT] [${entry.node}] [${entry.action}] User:${entry.userId} Status:${entry.status}`);

        // Todo: Push to Prisma/Database if needed
    }
}
