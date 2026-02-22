import * as crypto from 'crypto';
import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);
    private schedule = new Map<string, string>(); // time -> assetId (Mock Conflict DB)

    async scheduleAsset(dto: CreateScheduleDto) {
        this.logger.log(`[NODE 7] Scheduling Asset ${dto.assetId} for ${dto.platform} at ${dto.scheduledTime}`);

        // Node 7 Step 1: Check Conflicts
        if (this.schedule.has(dto.scheduledTime)) {
            throw new ConflictException(`Time slot ${dto.scheduledTime} is already booked.`);
        }

        // Node 7 Step 2: Add to Queue (Mock Redis)
        this.addToMockQueue(dto);
        this.schedule.set(dto.scheduledTime, dto.assetId);

        return {
            success: true,
            node: 'NODE_7_SCHEDULER',
            data: {
                jobId: crypto.randomUUID(),
                status: 'QUEUED',
                platform: dto.platform,
                scheduledFor: dto.scheduledTime
            }
        };
    }

    private addToMockQueue(dto: CreateScheduleDto) {
        // Simulate BullMQ add
        this.logger.log(`[MOCK REDIS] Added job to ${dto.platform}_queue`);
    }
}
