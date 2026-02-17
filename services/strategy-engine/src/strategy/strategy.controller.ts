
import { Body, Controller, Post } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { CreateCampaignBlueprintDto } from './dto/create-blueprint.dto';

@Controller('strategy')
export class StrategyController {
    constructor(private readonly strategyService: StrategyService) { }

    @Post('blueprint')
    async createBlueprint(@Body() dto: CreateCampaignBlueprintDto) {
        return this.strategyService.createBlueprint(dto);
    }
}
