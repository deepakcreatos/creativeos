
import * as crypto from 'crypto';
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GraphService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(GraphService.name);
  private prisma: PrismaClient;

  onModuleInit() {
    this.prisma = new PrismaClient();
  }

  async onModuleDestroy() {
    try {
      if (this.prisma) await this.prisma.$disconnect();
    } catch (error) {
       this.logger.error('Failed to disconnect Prisma', error);
    }
  }

  async storeRelationship(sourceId: string, targetId: string, type: string) {
    this.logger.log(`[NODE 11] Creating Relationship: (${sourceId}) -[${type}]-> (${targetId})`);

    // Node 11 Step 1: Store Nodes (Using PostgreSQL via Prisma instead of Neo4j)
    await this.prisma.graphNode.upsert({
        where: { id: sourceId },
        update: {},
        create: { id: sourceId, label: 'Asset' }
    });

    await this.prisma.graphNode.upsert({
        where: { id: targetId },
        update: {},
        create: { id: targetId, label: 'Strategy' }
    });

    // Node 11 Step 2: Store Edge
    await this.prisma.graphEdge.upsert({
        where: {
            sourceId_targetId_type: {
                sourceId,
                targetId,
                type
            }
        },
        update: {},
        create: {
            sourceId,
            targetId,
            type
        }
    });

    // Node 11 Step 3: Analyze Graph for Insights
    // Simple mock insight based on DB stats for now. In a real scenario, this would
    // be a recursive CTE or complex join to find patterns.
    const edgeCount = await this.prisma.graphEdge.count({ where: { sourceId } });
    const insight = edgeCount > 1 
        ? `Asset ${sourceId} is highly connected (${edgeCount} edges).` 
        : `New edge established for ${sourceId}.`;

    return {
      success: true,
      node: 'NODE_11_GRAPH_POSTGRES',
      data: {
        relationshipId: crypto.randomUUID(),
        sourceId,
        targetId,
        type,
        insight
      }
    };
  }
}
