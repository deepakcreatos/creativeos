import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RevisionModule } from './revision/revision.module';

@Module({
  imports: [RevisionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
