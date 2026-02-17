
import { IsString, IsNotEmpty, IsOptional, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum IndustryType {
    SAAS = 'SaaS',
    ECOMMERCE = 'E-commerce',
    REAL_ESTATE = 'Real Estate',
    HEALTHCARE = 'Healthcare',
    AGENCY = 'Agency',
    OTHER = 'Other'
}

export class TargetAudienceDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @IsOptional()
    painPoints?: string[];

    @IsArray()
    @IsOptional()
    goals?: string[];
}

export class GeographyDto {
    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    regionType?: 'Urban' | 'Suburban' | 'Rural';
}

export class PsychographicsDto {
    @IsString()
    @IsNotEmpty()
    story: string;

    @IsString()
    @IsOptional()
    tagline?: string;

    @IsArray()
    @IsOptional()
    values?: string[];

    @IsArray()
    @IsOptional()
    toneKeywords?: string[];
}
