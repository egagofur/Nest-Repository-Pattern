import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IUser } from 'interface-models/iam/user.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { ProfileEditPasswordRequest } from '../requests/profile-edit-password.request';
import { ProfileService } from '../services/profile.service';

@Controller('profile/edit/password')
@UseGuards(LoggedInGuard)
export class ProfilePasswordController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly profileService: ProfileService,
    ) {}

    @Get()
    async editPage(): Promise<null> {
        return this.inertiaAdapter.render('Profile/FormProfilePassword');
    }

    @Put()
    async editPassword(
        @GetUserLogged() user: IUser,
        @Body() request: ProfileEditPasswordRequest,
    ): Promise<void> {
        await this.profileService.updatePassword(user.id, request);
        this.inertiaAdapter.share('success');
        return this.inertiaAdapter.successResponse('/profile', 'Sukses edit');
    }
}
