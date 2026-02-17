import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';

@Injectable()
export class DnaService {
  constructor(private prisma: PrismaService) { }

  async create(createDnaDto: CreateDnaDto) {
    // Node 1 Step 1: Validate inputs (Handled by DTO Pipe)

    // Node 1 Step 2: Enrich via industry presets
    const enrichedData = this.enrichData(createDnaDto);

    // Node 1 Step 3: Create Semantic Tags & Vector Stub
    const semanticTags = this.generateSemanticTags(enrichedData);

    // Node 1 Step 4: Version & Store
    const dna = await this.prisma.clientDNA.create({
      data: {
        clientName: createDnaDto.clientName,
        industry: createDnaDto.industry,
        brandTone: createDnaDto.brandTone,
        targetAudience: createDnaDto.targetAudience as any, // Cast for Prisma Json
        geography: createDnaDto.geography as any,
        psychographics: createDnaDto.psychographics as any,
        products: createDnaDto.products || {},
        competitors: createDnaDto.competitors || {},
        semanticTags: semanticTags,
        // embedding: [0.1, 0.2...] // Todo: Integrate OpenAI/HuggingFace
      },
    });

    console.log('✅ [NODE 1] Client DNA Created & Enriched:', dna.id);
    return dna;
  }

  private enrichData(dto: CreateDnaDto) {
    // Simple rule-based enrichment for Phase 1
    // In Phase 2, this calls an LLM
    const enrichment = { ...dto };
    return enrichment;
  }

  private generateSemanticTags(dto: CreateDnaDto): string[] {
    const tags = [
      `industry:${dto.industry.toLowerCase()}`,
      `tone:${dto.brandTone.toLowerCase()}`,
    ];
    if (dto.geography?.country) tags.push(`geo:${dto.geography.country.toLowerCase()}`);
    return tags;
  }

  async findAll() {
    return this.prisma.clientDNA.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const dna = await this.prisma.clientDNA.findUnique({
      where: { id },
    });

    if (!dna) {
      throw new NotFoundException(`Client DNA with ID ${id} not found`);
    }

    return dna;
  }

  async update(id: string, updateDnaDto: UpdateDnaDto) {
    const currentDna = await this.findOne(id);

    return this.prisma.clientDNA.update({
      where: { id },
      data: {
        clientName: updateDnaDto.clientName,
        industry: updateDnaDto.industry,
        brandTone: updateDnaDto.brandTone,
        targetAudience: updateDnaDto.targetAudience as any,
        geography: updateDnaDto.geography as any,
        psychographics: updateDnaDto.psychographics as any,
        products: updateDnaDto.products || {},
        competitors: updateDnaDto.competitors || {},
        version: currentDna.version + 1,
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