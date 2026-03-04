import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DnaService } from './dna.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';
import { SupabaseJwtGuard } from '../auth/supabase-jwt.guard';

@UseGuards(SupabaseJwtGuard)
@Controller('dna')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDnaDto: CreateDnaDto, @Req() req: any) {
    // Bind the JWT user's ID to ensure ownership
    return this.dnaService.create({ ...createDnaDto, userId: req.user.sub });
  }

  @Get()
  findAll(@Req() req: any) {
    // Only return this user's own DNA profiles
    return this.dnaService.findByUser(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dnaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDnaDto: UpdateDnaDto) {
    return this.dnaService.update(id, updateDnaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dnaService.remove(id);
  }
}
