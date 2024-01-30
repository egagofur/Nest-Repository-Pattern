import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IUser } from 'interface-models/iam/user.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { ProfileEditRequest } from '../requests/profile-edit.request';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
@UseGuards(LoggedInGuard)
export class ProfileController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly profileService: ProfileService,
    ) {}

    @Get()
    async detailPage(@GetUserLogged() user: IUser): Promise<{
        data: IUser;
    }> {
        const data = await this.profileService.findOneById(user.id);
        return this.inertiaAdapter.render('Profile', {
            data,
        });
    }

    @Get('edit')
    async editPage(@GetUserLogged() user: IUser): Promise<{
        data: IUser;
    }> {
        const data = await this.profileService.findOneById(user.id);
        return this.inertiaAdapter.render('Profile/FormProfile', {
            data,
        });
    }

    @Put('edit')
    async edit(
        @GetUserLogged() user: IUser,
        @Body() request: ProfileEditRequest,
    ): Promise<void> {
        await this.profileService.update(user.id, request);
        this.inertiaAdapter.share('success');
        return this.inertiaAdapter.successResponse('/profile', 'Sukses edit');
    }
}
