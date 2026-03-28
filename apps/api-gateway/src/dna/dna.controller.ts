import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { DnaService } from './dna.service';

@Controller('dna')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Get('ping')
  ping() {
    return { status: 'DNA_NODE_ALIVE_IN_GATEWAY', timestamp: Date.now(), version: '2.0-embedded' };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() body: any) {
    return this.dnaService.create({ ...body, userId: req.user.id });
  }

  @Get()
  findAll(@Req() req: any) {
    return this.dnaService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.dnaService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.dnaService.update(id, body, req.user.id);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.dnaService.remove(id, req.user.id);
  }
}
