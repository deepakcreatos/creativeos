
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { SupabaseStrategy } from '../auth/supabase.strategy';

@Module({
    imports: [PassportModule],
    controllers: [ContentController],
    providers: [ContentService, SupabaseStrategy],
})
export class ContentModule { }
