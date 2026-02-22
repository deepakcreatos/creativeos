import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';
import * as crypto from 'crypto';

@Injectable()
export class DnaService {
  private mockDnaDb: any[] = [];

  constructor(private prisma: PrismaService) { 
    this.mockDnaDb.push({
      id: 'demo-client-id-hardcoded-for-now',
      clientName: 'Squadra Media',
      industry: 'Agency',
      brandTone: 'Professional',
      targetAudience: { description: 'B2B Tech Companies' },
      geography: {},
      psychographics: { story: 'Agile Marketing for Tech', tagline: 'Scale fast' },
      products: {},
      competitors: {},
      semanticTags: ['industry:agency', 'tone:professional'],
      version: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async create(createDnaDto: CreateDnaDto) {
    const enrichedData = this.enrichData(createDnaDto);
    const semanticTags = this.generateSemanticTags(enrichedData);

    const dna = {
      id: crypto.randomUUID(),
      clientName: createDnaDto.clientName,
      industry: createDnaDto.industry,
      brandTone: createDnaDto.brandTone,
      targetAudience: createDnaDto.targetAudience,
      geography: createDnaDto.geography,
      psychographics: createDnaDto.psychographics,
      products: createDnaDto.products || {},
      competitors: createDnaDto.competitors || {},
      semanticTags: semanticTags,
      version: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockDnaDb.push(dna);
    console.log('✅ [NODE 1] Client DNA Created (Mocked):', dna.id);
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
    return [...this.mockDnaDb].filter(d => d.isActive).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findOne(id: string) {
    const dna = this.mockDnaDb.find(d => d.id === id);
    if (!dna) {
      throw new NotFoundException(`Client DNA with ID ${id} not found`);
    }
    return dna;
  }

  async update(id: string, updateDnaDto: UpdateDnaDto) {
    const currentDnaIndex = this.mockDnaDb.findIndex(d => d.id === id);
    if (currentDnaIndex === -1) throw new NotFoundException('Not found');

    const updated = {
      ...this.mockDnaDb[currentDnaIndex],
      clientName: updateDnaDto.clientName || this.mockDnaDb[currentDnaIndex].clientName,
      industry: updateDnaDto.industry || this.mockDnaDb[currentDnaIndex].industry,
      brandTone: updateDnaDto.brandTone || this.mockDnaDb[currentDnaIndex].brandTone,
      version: this.mockDnaDb[currentDnaIndex].version + 1,
      updatedAt: new Date()
    };
    
    this.mockDnaDb[currentDnaIndex] = updated;
    return updated;
  }

  async remove(id: string) {
    const currentDnaIndex = this.mockDnaDb.findIndex(d => d.id === id);
    if (currentDnaIndex > -1) {
      this.mockDnaDb[currentDnaIndex].isActive = false;
    }
  }
}