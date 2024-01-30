import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../../Common/Route/Route';

export const sendEmailForgotPassword = (loginData): void => {
    Inertia.post(Route.AuthForgotPassword, loginData);
};
