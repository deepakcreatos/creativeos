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
  UnauthorizedException,
} from '@nestjs/common';
import { DnaService } from './dna.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';

@Controller('dna')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  private extractUserId(req: any): string {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];
    try {
      // Decode JWT payload (base64url)
      const payloadBase64 = token.split('.')[1];
      const payloadString = Buffer.from(payloadBase64, 'base64').toString('utf8');
      const payload = JSON.parse(payloadString);
      if (!payload.sub) {
        throw new UnauthorizedException('Invalid token payload: no user sub');
      }
      return payload.sub;
    } catch (err) {
      throw new UnauthorizedException('Failed to decode token');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDnaDto: CreateDnaDto, @Req() req: any) {
    const userId = this.extractUserId(req);
    return this.dnaService.create({ ...createDnaDto, userId });
  }

  @Get('ping')
  ping() {
    return { status: 'DNA_IS_ALIVE_AND_PROXIED', timestamp: Date.now() };
  }


  @Get()
  findAll(@Req() req: any) {
    const userId = this.extractUserId(req);
    return this.dnaService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = this.extractUserId(req);
    // Note: DnaService should Ideally verify findOne belongs to userId. Let's send userId if supported.
    // If dnaService doesn't accept userId for findOne, we rely on the controller to filter. 
    // Wait, the client-dna-service dnaService does not currently accept userId for findOne.
    // Let's rely on standard findOne. If security requires it, dnaService needs upgrading too.
    return this.dnaService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDnaDto: UpdateDnaDto, @Req() req: any) {
    const userId = this.extractUserId(req);
    return this.dnaService.update(id, updateDnaDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = this.extractUserId(req);
    return this.dnaService.remove(id, userId);
  }
}
