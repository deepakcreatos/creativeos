import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';

@Injectable()
export class DnaService implements OnModuleInit {
  private defaultUserId: string;

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    try {
      // Ensure at least one default user exists for Node 1
      let user = await this.prisma.user.findFirst();
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: 'demo@creativeos.ai',
            name: 'Demo Admin',
            passwordHash: 'hashed_pw',
            role: 'admin',
          }
        });
        console.log('✅ Demo User Created:', user.id);
      }
      this.defaultUserId = user.id;
    } catch (e) {
      console.warn('⚠️ Could not verify default user. Database might be down or misconfigured.', e.message);
    }
  }

  async create(createDnaDto: CreateDnaDto & { userId?: string }) {
    const enrichedData = this.enrichData(createDnaDto);
    const semanticTags = this.generateSemanticTags(enrichedData);
    
    // Use userId from JWT token or fallback to a default
    const userId = createDnaDto.userId || this.defaultUserId;

    // Simulate embedding generation (Node 2 / 3 task later)
    const emptyEmbedding = new Array(1536).fill(0).map(() => Math.random());

    // Prisma pgvector insert requires the extension and direct raw query for vectors 
    // if using Unsupported type without full native ORM mapping, but since we use extensions = [vector],
    // Prisma 5+ supports passing arrays if the prisma client was generated successfully.
    // However, to be 100% safe with Unsupported("vector(1536)"), we can use executeRaw or similar,
    // but Prisma typically accepts direct floats array. Let's try direct insert.
    // Actually, Prisma uses raw queries for `Unsupported`. So we insert the main row, then update the vector.
    
    const dna = await this.prisma.clientDNA.create({
      data: {
        userId: userId,
        clientName: createDnaDto.clientName,
        industry: createDnaDto.industry,
        brandTone: createDnaDto.brandTone,
        targetAudience: (createDnaDto.targetAudience || {}) as any,
        geography: (createDnaDto.geography || {}) as any,
        psychographics: (createDnaDto.psychographics || {}) as any,
        products: (createDnaDto.products || {}) as any,
        competitors: (createDnaDto.competitors || []) as any,
        semanticTags: semanticTags,
        version: 1,
        isActive: true,
      }
    });

    console.log('✅ [NODE 1] Client DNA Created in Postgres:', dna.id);

    // Update the vector using pgvector syntax (non-fatal if extension not enabled)
    try {
      const emptyEmbedding = new Array(1536).fill(0).map(() => Math.random());
      await this.prisma.$executeRaw`UPDATE "client_dna" SET embedding = ${emptyEmbedding}::vector WHERE id = ${dna.id}`;
    } catch (e) {
      console.warn('⚠️ Vector embedding skipped (pgvector may not be enabled):', e.message);
    }

    return dna;

  }

  private enrichData(dto: CreateDnaDto) {
    return { ...dto };
  }

  private generateSemanticTags(dto: CreateDnaDto): string[] {
    const tags = [
      `industry:${dto.industry.toLowerCase()}`,
      `tone:${dto.brandTone.toLowerCase()}`,
    ];
    if (dto.geography?.country) tags.push(`geo:${dto.geography.country.toLowerCase()}`);
    return tags;
  }

  async findByUser(userId: string) {
    return this.prisma.clientDNA.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findAll() {
    return this.prisma.clientDNA.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const dna = await this.prisma.clientDNA.findUnique({
      where: { id }
    });
    if (!dna || !dna.isActive) {
      throw new NotFoundException(`Client DNA with ID ${id} not found`);
    }
    return dna;
  }

  async update(id: string, updateDnaDto: UpdateDnaDto) {
    const dna = await this.findOne(id);

    return this.prisma.clientDNA.update({
      where: { id },
      data: {
        clientName: updateDnaDto.clientName || dna.clientName,
        industry: updateDnaDto.industry || dna.industry,
        brandTone: updateDnaDto.brandTone || dna.brandTone,
        version: dna.version + 1,
      }
    });
  }

  async remove(id: string) {
    await this.prisma.clientDNA.update({
      where: { id },
      data: { isActive: false }
    });
  }

  // Showcase pgvector similarity search
  async findSimilar(queryEmbedding: number[], limit: number = 5) {
    // Use pgvector's <-> operator for L2 distance (or <=> for cosine similarity)
    // We cast queryEmbedding to vector
    const results = await this.prisma.$queryRaw`
      SELECT id, client_name, industry, brand_tone, 
             1 - (embedding <=> ${queryEmbedding}::vector) AS similarity
      FROM "client_dna"
      WHERE is_active = true
      ORDER BY embedding <=> ${queryEmbedding}::vector
      LIMIT ${limit};
    `;
    return results;
  }
}