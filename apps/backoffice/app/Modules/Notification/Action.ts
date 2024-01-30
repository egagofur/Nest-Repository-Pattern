import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../Common/Route/Route';

export const markReadAllNotification = (): void => {
    Inertia.patch(Route.NotificationMarkReadAll);
};
