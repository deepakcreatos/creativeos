import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly svc: CampaignService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() body: any) { return this.svc.create({ ...body, userId: req.user.id }); }

  @Get()
  findAll(@Req() req: any) { return this.svc.findAll(req.user.id); }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) { return this.svc.findOne(id, req.user.id); }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, body, req.user.id); }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) { return this.svc.remove(id, req.user.id); }
}
