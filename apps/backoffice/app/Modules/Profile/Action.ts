import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../Common/Route/Route';
import { IProfileForm } from './Entities';

export const editProfile = (profileData: IProfileForm): void => {
    Inertia.put(Route.ProfileEdit, profileData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};

export const editProfilePassword = (profileData: IProfileForm): void => {
    Inertia.put(Route.ProfileEditPassword, profileData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};
