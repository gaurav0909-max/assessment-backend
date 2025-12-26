import { IsString, MinLength, IsNumber } from 'class-validator';

export class CreateWorkspaceDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsNumber()
    projectId: number;
}
