
import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateRevisionDto } from './dto/create-revision.dto';
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RevisionService {
    private readonly logger = new Logger(RevisionService.name);
    private groq: Groq;

    constructor() {
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async processRevision(dto: CreateRevisionDto) {
        this.logger.log(`[NODE 5] Processing Revision via Groq LLaMA 3 for Asset: ${dto.assetId}`);

        // Node 5 Step 1 & 2: Use LLM to classify feedback and generate refined prompt/text
        const prompt = `
        You are an elite creative director evaluating revision feedback.
        Original Prompt/Content: "${dto.originalPrompt || 'Unknown base asset'}"
        User Feedback: "${dto.feedback}"

        Analyze the feedback and provide a strict JSON response:
        {
          "classification": "VISUAL" | "TEXT" | "STRATEGY",
          "impactedNode": "NODE_4_MEDIA" | "NODE_3_CONTENT",
          "refinedPrompt": "The new prompt or text applying the feedback"
        }
        Return ONLY the JSON.
        `;

        let result;
        try {
            const chatCompletion = await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'llama3-8b-8192',
                temperature: 0.3,
                response_format: { type: 'json_object' }
            });

            const content = chatCompletion.choices[0]?.message?.content;
            if (!content) throw new Error('No content returned from Groq');

            result = JSON.parse(content);
        } catch (error) {
            this.logger.error('Error with Groq evaluation, using fallback', error);
            const classification = this.classifyFeedback(dto.feedback);
            result = {
                classification,
                impactedNode: classification === 'VISUAL' ? 'NODE_4_MEDIA' : 'NODE_3_CONTENT',
                refinedPrompt: `${dto.originalPrompt || 'Base Prompt'} + Fix: ${dto.feedback}`
            };
        }

        this.logger.log(`[NODE 5] Feedback Classified as: ${result.classification} -> Routing to ${result.impactedNode}`);

        // Node 5 Step 3: Trigger Regeneration (Mocked Bus Emit)
        // this.eventBus.emit('regenerate', { ...dto, target: result.impactedNode, newPrompt: result.refinedPrompt });

        return {
            success: true,
            node: 'NODE_5_REVISION',
            data: {
                revisionId: crypto.randomUUID(),
                classification: result.classification,
                action: `Triggered ${result.impactedNode} for regeneration`,
                refinedPrompt: result.refinedPrompt,
                metadata: {
                    model: 'llama3-8b-8192'
                }
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
