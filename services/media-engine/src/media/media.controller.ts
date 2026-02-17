
import { Body, Controller, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateVisualAssetDto } from './dto/create-visual-asset.dto';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('generate')
    async generateVisual(@Body() dto: CreateVisualAssetDto) {
        return this.mediaService.generateVisual(dto);
    }
}
