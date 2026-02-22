
import { Body, Controller, Post } from '@nestjs/common';
import { GraphService } from './graph.service';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post('connect')
  async connectNodes(@Body() body: { sourceId: string, targetId: string, type: string }) {
    return this.graphService.storeRelationship(body.sourceId, body.targetId, body.type);
  }
}
