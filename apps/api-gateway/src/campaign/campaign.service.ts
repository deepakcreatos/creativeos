import { Injectable, NotFoundException, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CampaignService implements OnModuleInit {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: { db: { url: process.env.DIRECT_URL ?? process.env.DATABASE_URL } },
    });
  }

  async onModuleInit() {
    try { await this.prisma.$connect(); } catch (e) { console.error('❌ [Campaign] DB failed:', (e as Error).message); }
  }

  async create(dto: any) {
    try {
      const pillars = ['Brand Authority', 'Market Education', 'Product Showcase', 'Customer Stories', 'Industry Trends'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        name: String(dto.name || 'Untitled Campaign'),
        objective: String(dto.objective || 'awareness'),
        platforms: dto.platforms ?? ['LinkedIn', 'Meta'],
        contentPillars: pillars,
        dateRange: dto.dateRange ?? { start: new Date().toISOString(), end: new Date(Date.now() + 30 * 86400000).toISOString() },
        status: 'draft',
        isActive: true,
      };
      if (dto.clientDnaId) data.clientDnaId = String(dto.clientDnaId);
      if (dto.userId) data.userId = String(dto.userId);
      const campaign = await this.prisma.campaign.create({ data });
      console.log('✅ [NODE 2] Campaign created:', campaign.id);
      return campaign;
    } catch (e) {
      console.error('❌ [Campaign] Create failed:', (e as Error).message);
      throw new InternalServerErrorException(`Campaign create failed: ${(e as Error).message}`);
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prisma.campaign.findMany({ where: { isActive: true, userId }, orderBy: { createdAt: 'desc' } });
    } catch { return []; }
  }

  async findOne(id: string, userId: string) {
    const c = await this.prisma.campaign.findFirst({ where: { id, userId } });
    if (!c || !c.isActive) throw new NotFoundException(`Campaign ${id} not found or unauthorized`);
    return c;
  }

  async update(id: string, dto: any, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.campaign.update({ where: { id }, data: { name: dto.name, status: dto.status } });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.campaign.update({ where: { id }, data: { isActive: false } });
  }
}
