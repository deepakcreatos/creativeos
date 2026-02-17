
import { IsUUID, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateContentDto {
    @IsUUID()
    @IsNotEmpty()
    blueprintId: string;

    @IsUUID()
    @IsNotEmpty()
    clientDnaId: string;

    @IsArray()
    @IsOptional()
    itemsToGenerate?: string[]; // e.g. ['linkedin_post', 'instagram_caption']
}
