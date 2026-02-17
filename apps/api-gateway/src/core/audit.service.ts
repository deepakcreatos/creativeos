
import { Injectable, Logger } from '@nestjs/common';
import { IAuditService, AuditLogEntry, NodeType } from '../../../../shared/core/interfaces/node.interface'; // Type import might be nuanced, let's fix path
// Actually I need to import from shared.
// Since I can't easily rely on path aliases without tsconfig change, I'll use relative path.

// Re-defining interface locally for now to avoid build issues if shared isn't compiled, 
// OR I will trust the relative path if I can.
// Let's try relative path C:\Users\LENOVO\Desktop\COSAI_Project\CreativeOS\shared\core\interfaces\audit.interface.ts -> ../../../../shared/core/interfaces/audit.interface.ts from src/core
// Wait, apps/api-gateway/src/core/audit.service.ts -> ../../../../shared ...
// apps/api-gateway/src/core -> apps/api-gateway/src -> apps/api-gateway -> apps -> root -> shared
// So it is ../../../../shared

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
