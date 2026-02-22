
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
        const authHeader = request.headers.authorization;

        // Node 0 Step 1: Authenticate
        if (!authHeader) {
            this.auditService.log({
                node: NodeType.ACCESS,
                action: 'AUTHENTICATION_FAILED',
                status: 'FAILURE',
                userId: 'anonymous',
                metadata: { reason: 'Missing Header' }
            });
            // Mock: allow if path is auth or root
            if (request.path.includes('/auth') || request.path === '/api' || request.path === '/api/') return true;
            throw new UnauthorizedException('Node 0: Missing Credentials');
        }

        // Node 0 Step 2: Resolve User (Mock Logic)
        // In real world: jwt.verify(token)
        const token = authHeader.split(' ')[1];
        if (token !== 'mock-jwt-token-for-demo' && !token.startsWith('mock-jwt-token')) {
            this.auditService.log({
                node: NodeType.ACCESS,
                action: 'AUTHENTICATION_FAILED',
                status: 'FAILURE',
                userId: 'anonymous',
                metadata: { reason: 'Invalid Token' }
            });
            throw new UnauthorizedException('Node 0: Invalid Credentials');
        }

        // Mock Context
        request.user = {
            id: 'demo-user-id',
            role: 'admin',
            workspaceId: 'workspace-1'
        };

        // Node 0 Step 3, 4, 5: RBAC, Flags, Audit
        await this.auditService.log({
            node: NodeType.ACCESS,
            action: 'ACCESS_GRANTED',
            status: 'SUCCESS',
            userId: request.user.id,
            metadata: { path: request.path, method: request.method }
        });

        return true;
    }
}
