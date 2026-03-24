import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Auth DB connected');
    } catch (error) {
      console.error('❌ Auth DB connection failed:', error.message);
    }
  }
}
