import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Jobs')
@ApiBearerAuth('access-token')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post()
    async createJob(@Body() dto: CreateJobDto) {
        return this.jobsService.submitJob(dto);
    }
}
