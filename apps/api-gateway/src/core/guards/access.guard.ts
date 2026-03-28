
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuditService } from '../audit.service';
import { NodeType } from '../../../../../shared/core/interfaces/node.interface';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(private readonly auditService: AuditService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization as string | undefined;
        const path = request.path as string;

        // ✅ Public routes — no token needed
        const publicPaths = ['/api', '/api/', '/api/auth', '/api/dna', '/api/campaigns'];
        if (publicPaths.some(p => path === p || path.startsWith(p))) {
            request.user = { id: 'public', role: 'user', workspaceId: 'default' };
            return true;
        }

        // Node 0 Step 1: Authenticate
        if (!authHeader) {
            void this.auditService.log({
                node: NodeType.ACCESS,
                action: 'AUTHENTICATION_FAILED',
                status: 'FAILURE',
                userId: 'anonymous',
                metadata: { reason: 'Missing Header' }
            });
            throw new UnauthorizedException('Node 0: Missing Credentials');
        }

        // Node 0 Step 2: Accept any valid Bearer token format
        const token = authHeader.split(' ')[1];
        if (!token || token.length < 5) {
            throw new UnauthorizedException('Node 0: Invalid Token Format');
        }

        // Set mock or real user context
        request.user = {
            id: token.startsWith('mock') ? 'demo-user-id' : 'jwt-user',
            role: 'admin',
            workspaceId: 'workspace-1'
        };

        void this.auditService.log({
            node: NodeType.ACCESS,
            action: 'ACCESS_GRANTED',
            status: 'SUCCESS',
            userId: request.user.id as string,
            metadata: { path, method: request.method }
        });

        return true;
    }
}
