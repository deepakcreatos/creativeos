
import { Injectable, Logger } from '@nestjs/common';
import { CreateCampaignBlueprintDto, CampaignObjective } from './dto/create-blueprint.dto';

@Injectable()
export class StrategyService {
    private readonly logger = new Logger(StrategyService.name);

    async createBlueprint(dto: CreateCampaignBlueprintDto) {
        this.logger.log(`[NODE 2] Generatng Blueprint for Client DNA: ${dto.clientDnaId}`);

        // Node 2 Step 1: Map Objective to Platform Logic
        const contentPillars = this.generateContentPillars(dto.objective);

        // Node 2 Step 2: Define KPIs
        const kpis = this.defineKPIs(dto.objective);

        return {
            success: true,
            node: 'NODE_2_STRATEGY',
            data: {
                blueprintId: crypto.randomUUID(),
                objective: dto.objective,
                strategy: {
                    pillars: contentPillars,
                    kpis: kpis,
                    recommendedPlatforms: this.recommendPlatforms(dto.objective),
                    timeline: '4 weeks', // dedicated implementation would be dynamic
                },
                // In real flow, this output goes to Node 3 (Content)
            }
        };
    }

    private generateContentPillars(objective: CampaignObjective): string[] {
        const commonPillars = ['Brand Story', 'Educational', 'Product Showcase'];
        switch (objective) {
            case CampaignObjective.AWARENESS:
                return ['Viral Trends', 'Mission Statement', ...commonPillars];
            case CampaignObjective.LEADS:
                return ['Case Studies', 'Webinars', 'Lead Magnets', 'Problem/Solution'];
            default:
                return commonPillars;
        }
    }

    private defineKPIs(objective: CampaignObjective): string[] {
        switch (objective) {
            case CampaignObjective.SALES: return ['ROAS', 'CAC', 'Conversion Rate'];
            case CampaignObjective.AWARENESS: return ['Impressions', 'Reach', 'Brand Lift'];
            default: return ['CTR', 'Engagement Rate'];
        }
    }

    private recommendPlatforms(objective: CampaignObjective): string[] {
        if (objective === CampaignObjective.LEADS) return ['LinkedIn', 'Facebook'];
        if (objective === CampaignObjective.AWARENESS) return ['TikTok', 'Instagram', 'YouTube Shorts'];
        return ['Instagram', 'LinkedIn'];
    }
}
