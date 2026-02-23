
import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateCampaignBlueprintDto, CampaignObjective } from './dto/create-blueprint.dto';
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class StrategyService {
    private readonly logger = new Logger(StrategyService.name);
    private groq: Groq;

    constructor() {
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async createBlueprint(dto: CreateCampaignBlueprintDto) {
        this.logger.log(`[NODE 2] Generating Blueprint using Groq LLaMA 3 for Client DNA: ${dto.clientDnaId}`);

        // Construct the prompt for Groq
        const prompt = `
        You are an elite digital marketing strategist.
        Create a campaign strategy blueprint based on the following inputs:
        Objective: ${dto.objective}
        Product Focus: ${dto.productFocus || 'General Brand'}
        
        Output valid JSON with the following structure:
        {
           "pillars": ["pillar1", "pillar2", "pillar3"],
           "kpis": ["kpi1", "kpi2", "kpi3"],
           "recommendedPlatforms": ["platform1", "platform2"],
           "timeline": "e.g., 4 weeks"
        }
        Return ONLY the JSON. No conversational text.
        `;

        try {
            const chatCompletion = await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'llama3-8b-8192',
                temperature: 0.5,
                response_format: { type: 'json_object' }
            });

            const content = chatCompletion.choices[0]?.message?.content;
            if (!content) throw new Error('No content returned from Groq');

            const strategy = JSON.parse(content);

            return {
                success: true,
                node: 'NODE_2_STRATEGY',
                data: {
                    blueprintId: crypto.randomUUID(),
                    objective: dto.objective,
                    strategy: strategy,
                    // In real flow, this output goes to Node 3 (Content)
                }
            };
        } catch (error) {
            this.logger.error('Error generating strategy with Groq', error);
            // Fallback strategy if API fails
            return {
                success: true,
                node: 'NODE_2_STRATEGY',
                data: {
                    blueprintId: crypto.randomUUID(),
                    objective: dto.objective,
                    strategy: {
                        pillars: this.generateContentPillars(dto.objective),
                        kpis: this.defineKPIs(dto.objective),
                        recommendedPlatforms: this.recommendPlatforms(dto.objective),
                        timeline: '4 weeks',
                    },
                }
            };
        }
    }

    // Fallbacks
    private generateContentPillars(objective: CampaignObjective): string[] {
        const commonPillars = ['Brand Story', 'Educational', 'Product Showcase'];
        switch (objective) {
            case CampaignObjective.AWARENESS: return ['Viral Trends', 'Mission Statement', ...commonPillars];
            case CampaignObjective.LEADS: return ['Case Studies', 'Webinars', 'Lead Magnets', 'Problem/Solution'];
            default: return commonPillars;
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
