import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://creativeos:creativepassword@localhost:5432/creativeos_dev';
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    // Prisma v7 constructor syntax
    super({ adapter } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
