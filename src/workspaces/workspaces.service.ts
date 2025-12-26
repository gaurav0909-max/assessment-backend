import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class WorkspacesService {
    private workspaces: Array<{ id: number; name: string; projectId: number; createdBy: number }> = [];

    createWorkspace(
        user: { userId: number; role: Role },
        dto: CreateWorkspaceDto,
    ) {
        if (user.role === Role.VIEWER) {
            throw new ForbiddenException(
                'Viewers cannot create workspaces',
            );
        }

        const workspace = {
            id: this.workspaces.length + 1,
            name: dto.name,
            projectId: dto.projectId,
            createdBy: user.userId,
        };

        this.workspaces.push(workspace);
        return workspace;
    }

    getWorkspacesByProject(projectId: number) {
        return this.workspaces.filter(
            w => w.projectId === projectId,
        );
    }
}
