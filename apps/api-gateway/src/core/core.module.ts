
import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuditService } from './audit.service';
import { AccessGuard } from './guards/access.guard';

@Global()
@Module({
    providers: [
        AuditService,
        {
            provide: APP_GUARD,
            useClass: AccessGuard,
        },
    ],
    exports: [AuditService],
})
export class CoreModule { }
