
import { Body, Controller, Post } from '@nestjs/common';
import { RevisionService } from './revision.service';
import { CreateRevisionDto } from './dto/create-revision.dto';

@Controller('revision')
export class RevisionController {
    constructor(private readonly revisionService: RevisionService) { }

    @Post('process')
    async processRevision(@Body() dto: CreateRevisionDto) {
        return this.revisionService.processRevision(dto);
    }
}
