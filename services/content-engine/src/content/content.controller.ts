
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { SupabaseJwtGuard } from '../auth/supabase-jwt.guard';

@UseGuards(SupabaseJwtGuard)
@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @Post('generate')
    async generateContent(@Body() dto: CreateContentDto) {
        return this.contentService.generateContent(dto);
    }
}
