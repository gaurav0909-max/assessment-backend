import {
    Body,
    Controller,
    Post,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@ApiBearerAuth('access-token')
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    @Roles(Role.OWNER)
    createProject(@Req() req, @Body() dto: CreateProjectDto) {
        return this.projectsService.createProject(req.user.userId, dto);
    }

    @Get()
    getMyProjects(@Req() req) {
        return this.projectsService.getProjectsByUser(req.user.userId);
    }
}
