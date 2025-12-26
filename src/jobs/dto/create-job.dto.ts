import { IsString } from 'class-validator';

export class CreateJobDto {
    @IsString()
    task: string;

    @IsString()
    language: string;
}
