import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() body: any) {
        // Accept any credentials for demo purposes
        return {
            access_token: 'mock-jwt-token',
            user: {
                id: 'user-' + Date.now(),
                email: body.email,
                name: body.email ? body.email.split('@')[0] : 'Demo User',
                role: body.email === 'admin@creativeos.ai' ? 'admin' : 'user',
            },
        };
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
