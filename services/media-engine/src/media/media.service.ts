
import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateVisualAssetDto, MediaType } from './dto/create-visual-asset.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MediaService {
    private readonly logger = new Logger(MediaService.name);

    constructor() {
    }

    async generateVisual(dto: CreateVisualAssetDto) {
        this.logger.log(`[NODE 4] Generating ${dto.type} via Pollinations AI for Content: ${dto.contentId || 'demo'}`);

        // Node 4 Step 1: Resolve Style & Prompt
        const style = dto.style || dto.styleOverride || 'Photorealistic';
        const color = dto.colorHint || '';
        
        // Node 4 Step 2: Construct Visual Prompt
        const basePrompt = dto.prompt ? dto.prompt : `A high-quality minimalist aesthetic`;
        const visualPrompt = `${basePrompt}, ${style} style${color ? `, featuring color palette ${color}` : ''}`;

        // Node 4 Step 3: Fast, Free generation using Pollinations AI
        const url = await this.freeGenerate(dto.type, visualPrompt, dto.dimensions);

        return {
            success: true,
            node: 'NODE_4_MEDIA',
            data: {
                assetId: crypto.randomUUID(),
                type: dto.type,
                url: url,
                dimensions: dto.dimensions || { width: 1080, height: 1080 },
                style: style,
                metadata: {
                    prompt: visualPrompt,
                    model: 'pollinations:flux'
                }
            }
        };
    }

    private async freeGenerate(type: MediaType, prompt: string, dims?: { width: number, height: number }): Promise<string> {
        if (type === MediaType.IMAGE) {
            try {
                // Pollinations AI provides free, instantaneous image generation via GET requests.
                const width = dims?.width || 1080;
                const height = dims?.height || 1080;
                const seed = Math.floor(Math.random() * 1000000);
                
                // Constructing the optimized stable-diffusion / flux prompt URL
                // We add nologo=true to remove watermarks for a professional look.
                const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
                
                return imageUrl;
            } catch (error) {
                this.logger.error('Free Inference failed, falling back', error);
                return `https://via.placeholder.com/1024x1024.png?text=Generation+Failed`;
            }
        } else {
            return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`; // Mock Video URL
        }
    }
}
