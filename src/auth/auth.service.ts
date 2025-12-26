import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(user: { id: number; email: string; role: Role }) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    async refresh(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            return this.login({
                id: payload.sub,
                email: payload.email,
                role: payload.role,
            });
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
