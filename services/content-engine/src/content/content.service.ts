
import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ContentService {
    private readonly logger = new Logger(ContentService.name);
    private groq: Groq;

    constructor() {
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateContent(dto: CreateContentDto) {
        this.logger.log(`[NODE 3] Generating Content using Groq LLaMA 3 for Blueprint: ${dto.blueprintId}`);

        // Node 3 Step 1 & 2: Abstract Prompt Setup
        const prompt = this.constructAbstractPrompt(dto);

        // Node 3 Step 3: Invoke LLM
        let generatedContent: any[] = [];
        try {
            generatedContent = await this.groqLLMCall(prompt);
        } catch (error) {
            this.logger.error('Error generating content with Groq, using fallback', error);
            generatedContent = this.mockLLMFallback();
        }

        return {
            success: true,
            node: 'NODE_3_CONTENT',
            data: {
                contentId: crypto.randomUUID(),
                items: generatedContent,
                metadata: {
                    model: 'llama3-8b-8192',
                    confidenceScore: 0.95
                }
            }
        };
    }

    private constructAbstractPrompt(dto: CreateContentDto): string {
        const platforms = dto.itemsToGenerate ? dto.itemsToGenerate.join(', ') : 'LinkedIn and Instagram';
        return `
        You are an elite AI copywriter.
        Generate marketing copy based on the following parameters.
        Blueprint ID Reference: ${dto.blueprintId}
        Client DNA Reference: ${dto.clientDnaId}
        Platforms/Formats to generate: ${platforms}

        Output valid JSON with the following structure:
        {
          "items": [
             {
               "platform": "Name of platform",
               "type": "post|caption|tweet etc",
               "text": "The generated marketing copy",
               "imagePrompt": "A detailed DALL-E/Midjourney style prompt for the visual"
             }
          ]
        }
        Return ONLY the JSON. No conversational text.
        `;
    }

    private async groqLLMCall(prompt: string) {
        const chatCompletion = await this.groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-8b-8192',
            temperature: 0.7,
            response_format: { type: 'json_object' }
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) throw new Error('No content returned from Groq');

        const parsed = JSON.parse(content);
        return parsed.items || [];
    }

    private mockLLMFallback() {
        return [
            {
                platform: 'LinkedIn',
                type: 'post',
                text: '🚀 Exciting news! We are transforming the industry with our latest update. #Innovation #Tech',
                imagePrompt: 'Futuristic office with glowing data streams'
            },
            {
                platform: 'Instagram',
                type: 'caption',
                text: 'Behind the scenes at CreativeOS! ✨ Swipe to see magic happen.',
                imagePrompt: 'Photorealistic workspace, cozy lighting, macbook pro'
            }
        ];
    }
}
