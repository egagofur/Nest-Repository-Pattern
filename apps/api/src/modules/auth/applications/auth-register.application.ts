import { Injectable } from '@nestjs/common';
import { ROLE_CHANGER } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import { IRole } from 'interface-models/iam/role.interface';
import { IUser } from 'interface-models/iam/user.interface';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { OtpService } from '../services/otp.service';
import { GoSmsApiNotificationService } from 'apps/api/src/infrastructure/notification/services/gosmsapi-notification.service';

@Injectable()
export class AuthRegisterApplication {
    constructor(
        private readonly userService: AuthService,
        private readonly roleService: RoleService,
        private readonly otpService: OtpService,
        private readonly goSmsApi: GoSmsApiNotificationService,
    ) {}

    async register(data: AuthRegisterDto): Promise<IUser> {
        const newUser = new User();
        const changerRole: IRole = await this.roleService.findByKey(
            ROLE_CHANGER,
        );

        Object.assign(newUser, data);
        newUser.roles = [changerRole];
        const user = await this.userService.create(newUser);

        const code = await this.otpService.createNewCodeByIdentifier(
            newUser.phoneNumber,
        );
        const content = `Gunakan ${code} sebagai inputan pendaftaran BuangDisini. Jangan beri tahu siapa-siapa. Meskipun pihak BuangDisini`;

        this.goSmsApi.sendSMS(user.id, content, newUser.phoneNumber);

        return user;
    }
}
