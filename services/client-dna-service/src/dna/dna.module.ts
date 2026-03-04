import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DnaService } from './dna.service';
import { DnaController } from './dna.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseStrategy } from '../auth/supabase.strategy';

@Module({
  imports: [PassportModule],
  controllers: [DnaController],
  providers: [DnaService, PrismaService, SupabaseStrategy],
  exports: [DnaService],
})
export class DnaModule {}