
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateVisualAssetDto } from './dto/create-visual-asset.dto';
import { SupabaseJwtGuard } from '../auth/supabase-jwt.guard';

@UseGuards(SupabaseJwtGuard)
@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('generate')
    async generateVisual(@Body() dto: CreateVisualAssetDto) {
        return this.mediaService.generateVisual(dto);
    }
}
