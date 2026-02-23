
import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'post_schedule',
        }),
    ],
    controllers: [SchedulerController],
    providers: [SchedulerService],
})
export class SchedulerModule { }
