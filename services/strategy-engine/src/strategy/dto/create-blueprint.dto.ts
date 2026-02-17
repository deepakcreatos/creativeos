
import { IsString, IsNotEmpty, IsUUID, IsEnum, IsOptional } from 'class-validator';

export enum CampaignObjective {
    AWARENESS = 'awareness',
    TRAFFIC = 'traffic',
    LEADS = 'leads',
    SALES = 'sales',
    ENGAGEMENT = 'engagement'
}

export class CreateCampaignBlueprintDto {
    @IsUUID()
    @IsNotEmpty()
    clientDnaId: string;

    @IsEnum(CampaignObjective)
    @IsNotEmpty()
    objective: CampaignObjective;

    @IsString()
    @IsOptional()
    productFocus?: string;
}
