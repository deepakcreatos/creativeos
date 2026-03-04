import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SupabaseStrategy],
})
export class AppModule {}
