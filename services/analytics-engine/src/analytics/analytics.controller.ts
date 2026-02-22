
import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':campaignId')
  async getCampaignMetrics(@Param('campaignId') id: string) {
    return this.analyticsService.aggregateMetrics(id);
  }
}
