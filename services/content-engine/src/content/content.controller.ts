
import { Body, Controller, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @Post('generate')
    async generateContent(@Body() dto: CreateContentDto) {
        return this.contentService.generateContent(dto);
    }
}
