
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { SupabaseStrategy } from '../auth/supabase.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, SupabaseStrategy],
})
export class AnalyticsModule {}
