
import { Body, Controller, Post, Param, Put } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { CreateApprovalDto } from './dto/create-approval.dto';

@Controller('approval')
export class ApprovalController {
    constructor(private readonly approvalService: ApprovalService) { }

    @Post('request')
    async request(@Body() dto: CreateApprovalDto) {
        return this.approvalService.requestApproval(dto);
    }

    @Put(':id/approve')
    async approve(@Param('id') id: string, @Body('userId') userId: string) {
        return this.approvalService.approve(id, userId);
    }

    @Put(':id/reject')
    async reject(@Param('id') id: string, @Body() body: any) {
        return this.approvalService.reject(id, body.userId, body.feedback);
    }
}
