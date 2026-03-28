import { Module } from '@nestjs/common';
import {
  ContentController,
  MediaController,
  StrategyController,
  RevisionController,
  ApprovalController,
  SchedulerController,
  AnalyticsController,
  BillingController,
  VoiceController,
  KnowledgeController,
  AuditController,
} from './nodes.controller';

@Module({
  controllers: [
    ContentController,
    MediaController,
    StrategyController,
    RevisionController,
    ApprovalController,
    SchedulerController,
    AnalyticsController,
    BillingController,
    VoiceController,
    KnowledgeController,
    AuditController,
  ],
})
export class NodesModule {}
