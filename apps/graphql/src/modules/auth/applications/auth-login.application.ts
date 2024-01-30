import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IUserWithToken } from 'interface-models/iam/user-with-token.interface';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'interface-models/iam/jwt-payload.interface';
import {
    AuthLoginRequest,
    AuthLoginResponse,
    AuthUserResponse,
} from '../types/auth-login.type';

@Injectable()
export class AuthLoginApplication {
    constructor(
        private jwtService: JwtService,
        private readonly userService: AuthService,
    ) {}

    async basic(data: AuthLoginRequest): Promise<AuthLoginResponse> {
        try {
            const user = await this.userService.validateUser(
                data.phoneNumber,
                data.password,
            );
            const payload: IJwtPayload = {
                id: user.id,
                email: user.email,
                phoneNumber: user.phoneNumber,
            };
            const accessToken: string = this.jwtService.sign(payload);

            return <AuthLoginResponse>{
                user: <AuthUserResponse>{
                    id: user.id,
                    fullname: user.fullname,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                },
                token: accessToken,
            };
        } catch (_) {
            throw new BadRequestException(
                'No. Telp and Kata Sandi tidak dikenali',
            );
        }
    }

    async createTokenByPhoneNumber(
        phoneNumber: string,
    ): Promise<IUserWithToken> {
        try {
            const user = await this.userService.findByPhoneNumber(phoneNumber);

            const payload: IJwtPayload = {
                id: user.id,
                email: user.email,
                phoneNumber: user.phoneNumber,
            };
            const accessToken: string = this.jwtService.sign(payload);

            return {
                user,
                token: accessToken,
            };
        } catch (_) {
            throw new BadRequestException(
                'No. Telp and Kata Sandi tidak dikenali',
            );
        }
    }
}
