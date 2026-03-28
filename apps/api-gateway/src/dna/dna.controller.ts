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
  create(@Body() body: any) {
    return this.dnaService.create(body);
  }

  @Get()
  findAll() {
    return this.dnaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dnaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.dnaService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dnaService.remove(id);
  }
}
