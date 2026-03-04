
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SupabaseJwtGuard } from '../auth/supabase-jwt.guard';

@UseGuards(SupabaseJwtGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':campaignId')
  async getCampaignMetrics(@Param('campaignId') id: string) {
    return this.analyticsService.aggregateMetrics(id);
  }
}
