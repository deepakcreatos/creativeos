import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApprovalModule } from './approval/approval.module';

@Module({
  imports: [ApprovalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
