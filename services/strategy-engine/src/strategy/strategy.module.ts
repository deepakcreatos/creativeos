
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StrategyService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { SupabaseStrategy } from '../auth/supabase.strategy';

@Module({
    imports: [PassportModule],
    controllers: [StrategyController],
    providers: [StrategyService, SupabaseStrategy],
})
export class StrategyModule { }
