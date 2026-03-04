
import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { CreateCampaignBlueprintDto } from './dto/create-blueprint.dto';
import { SupabaseJwtGuard } from '../auth/supabase-jwt.guard';

@UseGuards(SupabaseJwtGuard)
@Controller('strategy')
export class StrategyController {
    constructor(private readonly strategyService: StrategyService) { }

    @Post('blueprint')
    async createBlueprint(@Body() dto: CreateCampaignBlueprintDto, @Req() req: any) {
        return this.strategyService.createBlueprint(dto);
    }
}
