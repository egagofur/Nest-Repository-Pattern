import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'apps/api/src/config';
import { IJwtPayload } from 'interface-models/iam/jwt-payload.interface';
import { IUser } from 'interface-models/iam/user.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            secretOrKey: config.auth.jwt.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: IJwtPayload): Promise<IUser> {
        const { id } = payload;
        const user = await this.authService.findById(id);
        if (!user) {
            throw new UnprocessableEntityException(
                `Phone or password is not valid!`,
            );
        }

        return user;
    }
}
