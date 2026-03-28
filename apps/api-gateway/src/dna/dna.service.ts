import { Injectable, NotFoundException, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DnaService implements OnModuleInit {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
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
      const dna = await this.prisma.clientDNA.create({
        data: {
          userId: (dto.userId as string | undefined) ?? null,
          clientName: (dto.clientName as string) || 'Untitled Client',
          industry: (dto.industry as string) || 'Other',
          brandTone: (dto.brandTone as string) || 'Professional',
          targetAudience: (dto.targetAudience as object) || {},
          geography: (dto.geography as object) || {},
          psychographics: (dto.psychographics as object) || {},
          products: (dto.products as object) || {},
          competitors: (dto.competitors as object) || [],
          semanticTags: [
            `industry:${((dto.industry as string) || 'other').toLowerCase()}`,
            `tone:${((dto.brandTone as string) || 'professional').toLowerCase()}`,
          ],
          version: 1,
          isActive: true,
        },
      });
      console.log('✅ [NODE 1] DNA saved:', dna.id);
      return dna;
    } catch (e) {
      const err = e as Error;
      console.error('❌ [DNA] Create failed:', err.message);
      // Surface real error to help debug
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
