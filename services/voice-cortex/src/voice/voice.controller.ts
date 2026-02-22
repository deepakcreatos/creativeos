
import { Body, Controller, Post } from '@nestjs/common';
import { VoiceService } from './voice.service';

@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post('command')
  async handleCommand(@Body() body: { audioUrl: string, clientId: string }) {
    return this.voiceService.processVoiceCommand(body.audioUrl, body.clientId);
  }
}
