import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../../Common/Route/Route';

export const doLogin = (loginData): void => {
    Inertia.post(Route.AuthLogin + `?one_signal_player_id=`, loginData, {
        onSuccess: (success) => {
            console.log('Sukses: ', success);
        },
        onError: (error) => {
            console.log('Error: ', error);
        },
    });
};
