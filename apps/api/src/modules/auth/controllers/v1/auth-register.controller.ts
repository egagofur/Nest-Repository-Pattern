import { Body, Controller, Post } from '@nestjs/common';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import { AuthRegisterApplication } from '../../applications/auth-register.application';
import { AuthRegisterDto } from '../../dto/auth-register.dto';
import { AuthRegisterResponse } from '../../responses/auth-register.response';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authRegisterApplication: AuthRegisterApplication,
    ) {}

    @Post('register')
    async registerUser(
        @Body() data: AuthRegisterDto,
    ): Promise<IApiResponse<AuthRegisterResponse>> {
        const registerUser = await this.authRegisterApplication.register(data);

        return {
            data: {
                id: registerUser.id,
                phoneNumber: registerUser.phoneNumber,
            },
            message: 'Register Successfully',
        };
    }
}
