
import { IsUUID, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export enum Platform {
    LINKEDIN = 'linkedin',
    INSTAGRAM = 'instagram',
    TIKTOK = 'tiktok'
}

export class CreateScheduleDto {
    @IsUUID()
    @IsNotEmpty()
    assetId: string;

    @IsDateString()
    @IsNotEmpty()
    scheduledTime: string;

    @IsEnum(Platform)
    @IsNotEmpty()
    platform: Platform;
}
