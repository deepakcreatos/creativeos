import * as crypto from 'crypto';
import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);
    
    // In a real app we'd still want a persistent DB check for conflicts, but for the migration
    // we focus on replacing the mock Redis with actual BullMQ Redis queues.
    private mockDbSchedule = new Map<string, string>(); 

    constructor(@InjectQueue('post_schedule') private scheduleQueue: Queue) {}

    async scheduleAsset(dto: CreateScheduleDto) {
        this.logger.log(`[NODE 7] Scheduling Asset ${dto.assetId} for ${dto.platform} at ${dto.scheduledTime}`);

        // Node 7 Step 1: Check Conflicts (Mocked persistent check)
        if (this.mockDbSchedule.has(dto.scheduledTime)) {
            throw new ConflictException(`Time slot ${dto.scheduledTime} is already booked.`);
        }

        // Node 7 Step 2: Add to Queue (BullMQ Local Redis)
        const delay = new Date(dto.scheduledTime).getTime() - Date.now();
        const jobId = crypto.randomUUID();

        // Ensure delay is not negative if scheduled in the past
        const calculatedDelay = delay > 0 ? delay : 0;

        await this.scheduleQueue.add(
            'publish_post',
            { assetId: dto.assetId, platform: dto.platform },
            { delay: calculatedDelay, jobId }
        );

        this.mockDbSchedule.set(dto.scheduledTime, dto.assetId);
        this.logger.log(`[NODE 7] Job ${jobId} added to BullMQ 'post_schedule' queue with delay ${calculatedDelay}ms`);

        return {
            success: true,
            node: 'NODE_7_SCHEDULER',
            data: {
                jobId: jobId,
                status: 'QUEUED',
                platform: dto.platform,
                scheduledFor: dto.scheduledTime
            }
        };
    }
}
