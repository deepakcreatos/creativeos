
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRevisionDto {
    @IsUUID()
    @IsNotEmpty()
    assetId: string;

    @IsString()
    @IsNotEmpty()
    feedback: string;

    @IsString()
    @IsOptional()
    originalPrompt?: string;
}
