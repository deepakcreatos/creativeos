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
  Req,
  Optional,
} from '@nestjs/common';
import { DnaService } from './dna.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';

@Controller('dna')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDnaDto: CreateDnaDto, @Req() req: any) {
    // Use JWT user if present, otherwise use default dev user
    const userId = req.user?.sub;
    return this.dnaService.create({ ...createDnaDto, userId });
  }

  @Get('ping')
  ping() {
    return { status: 'DNA_IS_ALIVE_AND_PROXIED', timestamp: Date.now() };
  }


  @Get()
  findAll(@Req() req: any) {
    const userId = req.user?.sub;
    if (userId) {
      return this.dnaService.findByUser(userId);
    }
    return this.dnaService.findAll();
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
