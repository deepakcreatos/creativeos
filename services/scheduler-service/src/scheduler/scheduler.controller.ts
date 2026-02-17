
import { Body, Controller, Post } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('scheduler')
export class SchedulerController {
    constructor(private readonly schedulerService: SchedulerService) { }

    @Post('schedule')
    async schedule(@Body() dto: CreateScheduleDto) {
        return this.schedulerService.scheduleAsset(dto);
    }
}
