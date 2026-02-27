import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() body: any) {
        if (body.email === 'admin@creativeos.ai' && body.password === 'admin') {
            return {
                access_token: 'mock-jwt-token',
                user: {
                    id: 'admin-user-id',
                    email: body.email,
                    name: 'Admin',
                    role: 'admin',
                },
            };
        }
        
        console.log('Failed login attempt:', body.email);
        throw new UnauthorizedException('Invalid credentials');
    }

    @Post('register')
    register(@Body() body: any) {
        return {
            access_token: 'mock-jwt-token-new-' + Date.now(),
            user: {
                id: 'new-user-' + Date.now(),
                email: body.email,
                name: body.name || 'New User',
                role: 'user'
            }
        }
    }
}
