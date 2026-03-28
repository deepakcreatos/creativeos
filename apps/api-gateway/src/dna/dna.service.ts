import { Injectable, NotFoundException, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DnaService implements OnModuleInit {
  private prisma: PrismaClient;

  constructor() {
    // CRITICAL: Use DIRECT_URL (session pooler, port 5432) not DATABASE_URL (transaction pooler, port 6543)
    // PgBouncer transaction mode blocks Prisma's prepared statements causing silent 500s.
    // DIRECT_URL uses the session pooler which supports prepared statements correctly.
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
        },
      },
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    try {
      await this.prisma.$connect();
      console.log('✅ [DNA Gateway] Database connected successfully');
    } catch (e) {
      console.error('❌ [DNA Gateway] DB connection FAILED:', (e as Error).message);
      // Don't throw — server still boots, individual requests will fail gracefully
    }
  }

  async create(dto: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inputData: any = {
        clientName: String(dto.clientName || 'Untitled Client'),
        industry: String(dto.industry || 'Other'),
        brandTone: String(dto.brandTone || 'Professional'),
        targetAudience: dto.targetAudience ?? {},
        geography: dto.geography ?? {},
        psychographics: dto.psychographics ?? {},
        products: dto.products ?? {},
        competitors: dto.competitors ?? [],
        semanticTags: [
          `industry:${(String(dto.industry || 'other')).toLowerCase()}`,
          `tone:${(String(dto.brandTone || 'professional')).toLowerCase()}`,
        ],
        version: 1,
        isActive: true,
      };
      if (dto.userId) inputData.userId = String(dto.userId);

      const dna = await this.prisma.clientDNA.create({ data: inputData });
      console.log('✅ [NODE 1] DNA saved:', dna.id);
      return dna;
    } catch (e) {
      const err = e as Error;
      console.error('❌ [DNA] Create failed:', err.message);
      throw new InternalServerErrorException(`DNA create failed: ${err.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.clientDNA.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.error('❌ [DNA] FindAll failed:', (e as Error).message);
      return [];
    }
  }

  async findOne(id: string) {
    const dna = await this.prisma.clientDNA.findUnique({ where: { id } });
    if (!dna || !dna.isActive) {
      throw new NotFoundException(`Client DNA ${id} not found`);
    }
    return dna;
  }

  async update(id: string, dto: any) {
    const dna = await this.findOne(id);
    return this.prisma.clientDNA.update({
      where: { id },
      data: {
        clientName: (dto.clientName as string) || dna.clientName,
        industry: (dto.industry as string) || dna.industry,
        brandTone: (dto.brandTone as string) || dna.brandTone,
        version: dna.version + 1,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.clientDNA.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
