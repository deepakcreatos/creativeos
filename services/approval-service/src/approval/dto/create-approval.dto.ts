
import { IsUUID, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';

export enum ApprovalType {
    INTERNAL = 'internal',
    CLIENT = 'client',
    LEGAL = 'legal'
}

export class CreateApprovalDto {
    @IsUUID()
    @IsNotEmpty()
    assetId: string;

    @IsEnum(ApprovalType)
    @IsNotEmpty()
    type: ApprovalType;

    @IsArray()
    @IsOptional()
    approverIds?: string[];
}
