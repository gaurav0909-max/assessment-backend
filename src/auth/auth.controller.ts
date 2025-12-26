import {
    Body,
    Controller,
    Post,
    Get,
    UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorators';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        // Mocked user for assessment
        const user = {
            id: 1,
            email: dto.email,
            role: Role.OWNER,
        };

        return this.authService.login(user);
    }

    @Post('refresh')
    async refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refresh(dto.refreshToken);
    }

    /**
     * RBAC proof endpoint
     * Accessible only by OWNER role
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Get('protected')
    protectedRoute() {
        return {
            message: 'Only OWNER can access this route',
        };
    }
}
