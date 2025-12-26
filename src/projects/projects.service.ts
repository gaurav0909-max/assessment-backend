import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
    private projects: { id: number; name: string; ownerId: number }[] = [];

    createProject(ownerId: number, dto: CreateProjectDto) {
        const project = {
            id: this.projects.length + 1,
            name: dto.name,
            ownerId,
        };

        this.projects.push(project);
        return project;
    }

    getProjectsByUser(userId: number) {
        return this.projects.filter(
            p => p.ownerId === userId,
        );
    }
}
