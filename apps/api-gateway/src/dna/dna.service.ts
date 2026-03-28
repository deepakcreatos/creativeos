import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DnaService implements OnModuleInit {
  private prisma: PrismaClient;
  private defaultUserId: string;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    try {
      await this.prisma.$connect();
      console.log('✅ [DNA] Database connected');

      // Ensure a default user exists for saves without JWT
      let user = await this.prisma.user.findFirst();
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: 'demo@creativeos.ai',
            name: 'Demo Admin',
            passwordHash: 'hashed_pw',
            role: 'admin',
          },
        });
        console.log('✅ [DNA] Demo user created:', user.id);
      }
      this.defaultUserId = user.id;
    } catch (e) {
      console.error('❌ [DNA] DB connection failed:', (e as Error).message);
    }
  }

  async create(dto: any) {
    const userId = dto.userId || this.defaultUserId;
    try {
      const dna = await this.prisma.clientDNA.create({
        data: {
          userId: userId,
          clientName: dto.clientName || 'Untitled Client',
          industry: dto.industry || 'Other',
          brandTone: dto.brandTone || 'Professional',
          targetAudience: dto.targetAudience || {},
          geography: dto.geography || {},
          psychographics: dto.psychographics || {},
          products: dto.products || {},
          competitors: dto.competitors || [],
          semanticTags: [
            `industry:${(dto.industry || 'other').toLowerCase()}`,
            `tone:${(dto.brandTone || 'professional').toLowerCase()}`,
          ],
          version: 1,
          isActive: true,
        },
      });
      console.log('✅ [NODE 1] Client DNA saved:', dna.id);
      return dna;
    } catch (e) {
      console.error('❌ [DNA] Create failed:', (e as Error).message);
      throw e;
    }
  }

  async findAll() {
    return this.prisma.clientDNA.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
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
        clientName: dto.clientName || dna.clientName,
        industry: dto.industry || dna.industry,
        brandTone: dto.brandTone || dna.brandTone,
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
