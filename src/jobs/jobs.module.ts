import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsProcessor } from './jobs.processor';

@Module({
    controllers: [JobsController],
    providers: [JobsService, JobsProcessor],
})
export class JobsModule { }
