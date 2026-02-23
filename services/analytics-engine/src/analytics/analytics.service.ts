
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PostHog } from 'posthog-node';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AnalyticsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AnalyticsService.name);
  private client: PostHog;

  onModuleInit() {
    this.client = new PostHog(
      process.env.POSTHOG_API_KEY || 'phc_placeholder',
      { host: 'https://app.posthog.com' }
    );
  }

  onModuleDestroy() {
    this.client.shutdown();
  }

  async aggregateMetrics(campaignId: string) {
    this.logger.log(`[NODE 8] Aggregating Metrics for Campaign: ${campaignId}`);

    // Node 8 Step 1: Fetch Raw Data (Mock)
    const rawData = {
      impressions: 15000,
      clicks: 450,
      conversions: 12
    };

    // Node 8 Step 2: Normalize
    const normalized = {
      ctr: (rawData.clicks / rawData.impressions) * 100,
      cpc: 1.5, // Mock
      roas: 3.2
    };

    // Node 8 Step 3: Track Event in PostHog
    this.client.capture({
        distinctId: `campaign_${campaignId}`,
        event: 'campaign_metrics_aggregated',
        properties: {
            campaignId: campaignId,
            ...rawData,
            ...normalized
        }
    });

    this.logger.log(`[NODE 8] Event 'campaign_metrics_aggregated' sent to PostHog for ${campaignId}`);

    // Node 8 Step 4: Generate Insight
    const insight = normalized.ctr > 2.0 
      ? 'High engagement detected on LinkedIn assets.' 
      : 'Engagement below benchmark. Recommend revising visuals.';

    return {
      success: true,
      node: 'NODE_8_ANALYTICS',
      data: {
        campaignId,
        metrics: normalized,
        insight
      }
    };
  }
}
