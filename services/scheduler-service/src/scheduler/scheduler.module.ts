
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { BullModule } from '@nestjs/bullmq';
import { SupabaseStrategy } from '../auth/supabase.strategy';

@Module({
    imports: [
        PassportModule,
        BullModule.registerQueue({
            name: 'post_schedule',
        }),
    ],
    controllers: [SchedulerController],
    providers: [SchedulerService, SupabaseStrategy],
})
export class SchedulerModule { }
