import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';

type NotifciationType = Omit<IInAppNotification, 'isRead'> & {
    isRead: boolean | string;
};

export { NotifciationType };
