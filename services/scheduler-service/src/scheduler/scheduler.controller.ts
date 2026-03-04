
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SupabaseJwtGuard } from '../auth/supabase-jwt.guard';

@UseGuards(SupabaseJwtGuard)
@Controller('scheduler')
export class SchedulerController {
    constructor(private readonly schedulerService: SchedulerService) { }

    @Post('schedule')
    async schedule(@Body() dto: CreateScheduleDto) {
        return this.schedulerService.scheduleAsset(dto);
    }
}
