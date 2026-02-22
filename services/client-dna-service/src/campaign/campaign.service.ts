import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import * as crypto from 'crypto';

@Injectable()
export class CampaignService {
  private mockCampaignDb: any[] = [];

  constructor(private prisma: PrismaService) { }

  async create(createCampaignDto: CreateCampaignDto) {
    // Generate content pillars if not provided
    const contentPillars = createCampaignDto.contentPillars ||
      await this.generateContentPillars(
        createCampaignDto.objective,
        createCampaignDto.platforms,
        { industry: 'General', targetAudience: { description: 'All' }, brandTone: 'Professional' }
      );

    const campaign = {
      id: crypto.randomUUID(),
      name: createCampaignDto.name,
      objective: createCampaignDto.objective,
      clientDnaId: createCampaignDto.clientDnaId,
      platforms: createCampaignDto.platforms,
      contentPillars,
      dateRange: createCampaignDto.dateRange,
      kpis: createCampaignDto.kpis || this.generateKPIs(createCampaignDto.objective),
      budget: createCampaignDto.budget,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.mockCampaignDb.push(campaign);
    console.log('✅ Campaign Created (Mocked):', campaign.id);
    return campaign;
  }

  async findAll() {
    return [...this.mockCampaignDb]
      .filter(c => c.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findOne(id: string) {
    const campaign = this.mockCampaignDb.find(c => c.id === id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async findByClientDna(clientDnaId: string) {
    return this.mockCampaignDb
      .filter(c => c.clientDnaId === clientDnaId && c.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    const currentIndex = this.mockCampaignDb.findIndex(c => c.id === id);
    if (currentIndex === -1) throw new NotFoundException('Not found');

    const updated = {
      ...this.mockCampaignDb[currentIndex],
      ...updateCampaignDto,
      updatedAt: new Date()
    };
    
    this.mockCampaignDb[currentIndex] = updated;
    return updated;
  }

  async remove(id: string) {
    const currentIndex = this.mockCampaignDb.findIndex(c => c.id === id);
    if (currentIndex > -1) {
      this.mockCampaignDb[currentIndex].isActive = false;
    }
  }

  // AI-POWERED LOGIC: Generate Content Pillars
  private async generateContentPillars(
    objective: string,
    platforms: string[],
    clientDna: any
  ): Promise<string[]> {
    const prompt = `
      Act as a Social Media Strategist. Generate 5 unique content pillars for a brand with the following DNA:
      - Industry: ${clientDna.industry}
      - Target Audience: ${JSON.stringify(clientDna.targetAudience)}
      - Brand Tone: ${clientDna.brandTone}
      - Campaign Objective: ${objective}
      - Platforms: ${platforms.join(', ')}

      Return ONLY a JSON array of strings, e.g. ["Pillar 1", "Pillar 2"]. No other text.
    `;

    // 1. Try Ollama (Local LLM)
    if (process.env.AI_MODE === 'ollama') {
      try {
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'mistral',
            prompt: prompt,
            stream: false,
            format: 'json'
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const pillars = JSON.parse(data.response);
          if (Array.isArray(pillars)) return pillars.slice(0, 5);
        }
      } catch (e) {
        console.warn('⚠️ Ollama unavailable, falling back to rule-based logic.');
      }
    }

    // 2. Fallback: Rule-based generation (Demo Mode)
    const pillars: string[] = [];

    // Objective-based pillars
    const objectivePillars = {
      awareness: ['Brand Story', 'Educational Content', 'Industry Insights'],
      engagement: ['Behind the Scenes', 'User Stories', 'Interactive Content'],
      conversion: ['Product Benefits', 'Case Studies', 'Limited Offers'],
      leads: ['Free Resources', 'Webinars', 'Expert Tips'],
    };

    pillars.push(...(objectivePillars[objective] || objectivePillars.awareness));

    // Industry-specific pillar
    pillars.push(`${clientDna.industry} Trends`);

    // Platform-specific pillar
    if (platforms.includes('youtube')) {
      pillars.push('Video Tutorials');
    }
    if (platforms.includes('linkedin')) {
      pillars.push('Professional Insights');
    }

    return pillars.slice(0, 5); // Return top 5
  }

  // Generate KPIs based on objective
  private generateKPIs(objective: string): any {
    const kpiMap = {
      awareness: {
        reach: { target: 50000, unit: 'impressions' },
        engagement_rate: { target: 3.5, unit: 'percentage' },
        brand_mentions: { target: 100, unit: 'count' },
      },
      engagement: {
        likes: { target: 2000, unit: 'count' },
        comments: { target: 500, unit: 'count' },
        shares: { target: 300, unit: 'count' },
        engagement_rate: { target: 5, unit: 'percentage' },
      },
      conversion: {
        conversions: { target: 200, unit: 'count' },
        conversion_rate: { target: 2.5, unit: 'percentage' },
        cost_per_conversion: { target: 25, unit: 'currency' },
      },
      leads: {
        leads: { target: 500, unit: 'count' },
        cost_per_lead: { target: 15, unit: 'currency' },
        lead_quality_score: { target: 7.5, unit: 'score' },
      },
    };

    return kpiMap[objective] || kpiMap.awareness;
  }
}