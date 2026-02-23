
import * as crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateVisualAssetDto, MediaType } from './dto/create-visual-asset.dto';
import { HfInference } from '@huggingface/inference';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MediaService {
    private readonly logger = new Logger(MediaService.name);
    private hf: HfInference;

    constructor() {
        this.hf = new HfInference(process.env.HF_TOKEN);
    }

    async generateVisual(dto: CreateVisualAssetDto) {
        this.logger.log(`[NODE 4] Generating ${dto.type} via Hugging Face for Content: ${dto.contentId}`);

        // Node 4 Step 1: Resolve Style from DNA (Mocked)
        const style = dto.styleOverride || 'Minimalist Tech';

        // Node 4 Step 2: Construct Visual Prompt
        const visualPrompt = `A high-quality minimalist ${dto.type} featuring ${style} aesthetics, professional photography`;

        // Node 4 Step 3: Invoke Hugging Face Inference
        const url = await this.hfGenerate(dto.type, visualPrompt);

        return {
            success: true,
            node: 'NODE_4_MEDIA',
            data: {
                assetId: crypto.randomUUID(),
                type: dto.type,
                url: url,
                metadata: {
                    prompt: visualPrompt,
                    model: dto.type === MediaType.IMAGE ? 'stabilityai/stable-diffusion-xl-base-1.0' : 'runway-gen2-mock'
                }
            }
        };
    }

    private async hfGenerate(type: MediaType, prompt: string): Promise<string> {
        if (type === MediaType.IMAGE) {
            try {
                // Use SDXL for free top-tier image generation
                const result = await this.hf.textToImage({
                    inputs: prompt,
                    model: 'stabilityai/stable-diffusion-xl-base-1.0',
                    parameters: {
                        negative_prompt: 'blurry, distorted, low quality, text, watermark',
                        num_inference_steps: 25
                    }
                });

                // Generate a random mocked URL or convert blob to base64 if needed, 
                // but since we need a public URL for a microservice, usually we upload it to S3.
                // For this demo structure, we will return a placeholder representing the generated asset
                // (To actually serve it, we'd save to disk or mock a bucket upload)
                return `https://dummyimage.com/1024x1024/000/fff&text=SDXL-Generated-Image`;
            } catch (error) {
                this.logger.error('HF Inference failed, falling back', error);
                return `https://via.placeholder.com/1024x1024.png?text=Fallback`;
            }
        } else {
            return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`; // Mock Video URL
        }
    }
}
