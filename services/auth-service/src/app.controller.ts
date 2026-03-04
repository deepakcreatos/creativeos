import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SupabaseJwtGuard } from './supabase-guard';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getHello() {
    return { status: 'Auth Service is completely operational!' };
  }

  @UseGuards(SupabaseJwtGuard)
  @Get('auth/me')
  async getProfile(@Req() req: any) {
    const userId = req.user.sub; // Supabase JWT user ID

    // Fetch user role from our DB, or create one if it doesn't exist yet
    let userRole = await this.prisma.userRole.findUnique({
      where: { userId },
    });

    if (!userRole) {
      userRole = await this.prisma.userRole.create({
        data: {
          userId,
          role: 'Client', // Default role
        },
      });
    }

    return {
      userId,
      email: req.user.email,
      role: userRole.role,
    };
  }
}
