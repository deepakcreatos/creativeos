
import { NodeType } from './node.interface';

export interface AuditLogEntry {
    id: string;
    timestamp: Date;
    node: NodeType;
    userId: string;
    action: string;
    resourceId?: string;
    status: 'SUCCESS' | 'FAILURE' | 'PENDING';
    metadata?: Record<string, any>;
}

export interface IAuditService {
    log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void>;
}
