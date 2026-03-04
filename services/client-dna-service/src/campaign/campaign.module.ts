import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseStrategy } from '../auth/supabase.strategy';

@Module({
  imports: [PassportModule],
  controllers: [CampaignController],
  providers: [CampaignService, PrismaService, SupabaseStrategy],
  exports: [CampaignService],
})
export class CampaignModule {}