import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDnaDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  brandTone: string;

  @IsOptional()
  targetAudience?: any;

  @IsOptional()
  geography?: any;

  @IsOptional()
  psychographics?: any;

  @IsOptional()
  products?: any;

  @IsOptional()
  competitors?: any;
}