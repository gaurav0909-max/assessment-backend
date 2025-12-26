import {
    Body,
    Controller,
    Post,
    Get,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';

import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorators';

@Controller('workspaces')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkspacesController {
    constructor(
        private readonly workspacesService: WorkspacesService,
    ) { }

    @Post()
    @Roles(Role.OWNER, Role.COLLABORATOR)
    createWorkspace(@Req() req, @Body() dto: CreateWorkspaceDto) {
        return this.workspacesService.createWorkspace(req.user, dto);
    }

    @Get()
    getByProject(@Query('projectId') projectId: number) {
        return this.workspacesService.getWorkspacesByProject(
            Number(projectId),
        );
    }
}
