import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { CoreModule } from './core/core.module';
import { DnaModule } from './dna/dna.module';
import { CampaignModule } from './campaign/campaign.module';
import { NodesModule } from './nodes/nodes.module';

@Module({
  imports: [CoreModule, DnaModule, CampaignModule, NodesModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
