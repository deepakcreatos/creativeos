import { IsString, IsNotEmpty, IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TargetAudienceDto, GeographyDto, PsychographicsDto, IndustryType } from './dna-subtypes.dto';

export class CreateDnaDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsEnum(IndustryType)
  @IsNotEmpty()
  industry: IndustryType;

  @IsString()
  @IsNotEmpty()
  brandTone: string;

  @ValidateNested()
  @Type(() => TargetAudienceDto)
  targetAudience: TargetAudienceDto;

  @ValidateNested()
  @Type(() => GeographyDto)
  geography: GeographyDto;

  @ValidateNested()
  @Type(() => PsychographicsDto)
  psychographics: PsychographicsDto;

  @IsOptional()
  products?: any; // Todo: Define strict Product Schema

  @IsOptional()
  competitors?: any;
}