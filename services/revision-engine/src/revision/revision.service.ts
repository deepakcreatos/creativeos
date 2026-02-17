
import { Injectable, Logger } from '@nestjs/common';
import { CreateRevisionDto } from './dto/create-revision.dto';

@Injectable()
export class RevisionService {
    private readonly logger = new Logger(RevisionService.name);

    async processRevision(dto: CreateRevisionDto) {
        this.logger.log(`[NODE 5] Processing Revision for Asset: ${dto.assetId}`);

        // Node 5 Step 1: Classify Feedback
        const classification = this.classifyFeedback(dto.feedback);
        this.logger.log(`[NODE 5] Feedback Classified as: ${classification}`);

        // Node 5 Step 2: Identify Impacted Nodes
        const impactedNode = classification === 'VISUAL' ? 'NODE_4_MEDIA' : 'NODE_3_CONTENT';

        // Node 5 Step 3: Trigger Regeneration (Mock)
        // this.eventBus.emit('regenerate', { ...dto, target: impactedNode });

        return {
            success: true,
            node: 'NODE_5_REVISION',
            data: {
                revisionId: crypto.randomUUID(),
                classification,
                action: `Triggered ${impactedNode} for regeneration`,
                refinedPrompt: `${dto.originalPrompt || 'Base Prompt'} + Fix: ${dto.feedback}`
            }
        };
    }

    private classifyFeedback(feedback: string): 'VISUAL' | 'TEXT' | 'STRATEGY' {
        const lower = feedback.toLowerCase();
        if (lower.includes('color') || lower.includes('image') || lower.includes('look')) return 'VISUAL';
        if (lower.includes('tone') || lower.includes('word') || lower.includes('typo')) return 'TEXT';
        return 'STRATEGY';
    }
}
