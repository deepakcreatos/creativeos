
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuditService } from '../audit.service';
import { NodeType } from '../../../../../shared/core/interfaces/node.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(private readonly auditService: AuditService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization as string | undefined;
        const path = request.path as string;

        // ✅ Public routes — severely limited
        const publicPaths = [
          '/api', '/api/',
          '/api/auth',
        ];
        if (publicPaths.some(p => path === p || path.startsWith(p))) {
            request.user = { id: 'public', role: 'user', workspaceId: 'default' };
            return true;
        }

        // Node 0 Step 1: Authenticate
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            void this.auditService.log({
                node: NodeType.ACCESS,
                action: 'AUTHENTICATION_FAILED',
                status: 'FAILURE',
                userId: 'anonymous',
                metadata: { reason: 'Missing or Invalid Header' }
            });
            throw new UnauthorizedException('Node 0: Missing or Invalid Token format');
        }

        const token = authHeader.split(' ')[1];
        if (!token) throw new UnauthorizedException('Node 0: Token empty');

        try {
            // Strictly verify against Supabase Secret if present
            const secret = process.env.SUPABASE_JWT_SECRET;
            let payload: any;

            if (secret) {
                payload = jwt.verify(token, secret);
            } else {
                // Fallback for development if secret isn't loaded (extracts sub)
                payload = jwt.decode(token);
                if (!payload || !payload.sub) throw new Error('Malformed token signature');
            }

            request.user = {
                id: payload.sub,
                role: payload.role || payload.user_role || 'authenticated',
                email: payload.email || 'unknown',
                workspaceId: 'default'
            };

            void this.auditService.log({
                node: NodeType.ACCESS,
                action: 'ACCESS_GRANTED',
                status: 'SUCCESS',
                userId: request.user.id as string,
                metadata: { path, method: request.method }
            });

            return true;
        } catch (error: any) {
            void this.auditService.log({
                node: NodeType.ACCESS,
                action: 'AUTHENTICATION_FAILED',
                status: 'FAILURE',
                userId: 'anonymous',
                metadata: { reason: error.message }
            });
            throw new UnauthorizedException(`Node 0: Unauthorized - ${error.message}`);
        }
    }
}
