
import { IsUUID, IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video'
}

export class CreateVisualAssetDto {
    @IsUUID()
    @IsNotEmpty()
    contentId: string;

    @IsUUID()
    @IsNotEmpty()
    clientDnaId: string;

    @IsEnum(MediaType)
    @IsNotEmpty()
    type: MediaType;

    @IsString()
    @IsOptional()
    styleOverride?: string;
    
    @IsString()
    @IsOptional()
    style?: string;

    @IsOptional()
    dimensions?: { width: number; height: number };

    @IsString()
    @IsOptional()
    prompt?: string;

    @IsString()
    @IsOptional()
    colorHint?: string;
}
