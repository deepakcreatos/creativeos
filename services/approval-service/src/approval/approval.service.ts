
import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateApprovalDto, ApprovalType } from './dto/create-approval.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

export enum ApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

@Injectable()
export class ApprovalService {
    private readonly logger = new Logger(ApprovalService.name);
    // Mock DB
    private approvals = new Map<string, any>();

    constructor(private eventEmitter: EventEmitter2) {}

    async requestApproval(dto: CreateApprovalDto) {
        this.logger.log(`[NODE 6] Requesting ${dto.type} Approval for Asset: ${dto.assetId}`);

        const approvalId = crypto.randomUUID();
        const record = {
            id: approvalId,
            ...dto,
            status: ApprovalStatus.PENDING,
            createdAt: new Date(),
            history: []
        };

        this.approvals.set(approvalId, record);

        // Node 6 Step 1: Route Internal Approvals -> Notify via Node 10 (Voice/Comm) - Emit event
        this.eventEmitter.emit('approval.requested', record);
        this.logger.log(`[NODE 6] Emitted 'approval.requested' event for Asset: ${dto.assetId}`);

        return {
            success: true,
            node: 'NODE_6_APPROVAL',
            data: record
        };
    }

    async approve(id: string, userId: string) {
        const record = this.approvals.get(id);
        if (!record) throw new Error('Approval not found');

        record.status = ApprovalStatus.APPROVED;
        record.history.push({ action: 'APPROVE', userId, timestamp: new Date() });

        this.logger.log(`[NODE 6] Asset ${record.assetId} APPROVED by ${userId}`);

        // Trigger Downstream: Node 7 (Scheduler) or Node 9 (Billing)
        this.eventEmitter.emit('approval.granted', record);
        this.logger.log(`[NODE 6] Emitted 'approval.granted' event for Asset: ${record.assetId}`);

        return { success: true, data: record };
    }

    async reject(id: string, userId: string, feedback: string) {
        const record = this.approvals.get(id);
        if (!record) throw new Error('Approval not found');

        record.status = ApprovalStatus.REJECTED;
        record.history.push({ action: 'REJECT', userId, feedback, timestamp: new Date() });

        this.logger.log(`[NODE 6] Asset ${record.assetId} REJECTED. Triggering Node 5 (Revision).`);

        // Trigger Node 5
        this.eventEmitter.emit('approval.rejected', { ...record, feedback });
        this.logger.log(`[NODE 6] Emitted 'approval.rejected' event for Asset: ${record.assetId}`);

        return { success: true, data: record };
    }
}
