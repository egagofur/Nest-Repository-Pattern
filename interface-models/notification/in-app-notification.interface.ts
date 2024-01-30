import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IUser } from 'interface-models/iam/user.interface';

export enum NotificationTypeEnum {
    RequestPickTrash = 'request_pick_trash', // list deposit trash orang-orang yang mau di pick
    DepositTrashValidated = 'deposit_trash_validated', // detail transaction by meta data id
    AcceptPickTrash = 'accept_pick_trash', // detail transaction by meta data id
}

export interface IInAppNotification extends IBaseEntity {
    id?: number;

    targetUser?: IUser;

    targetUserId?: number;

    type: NotificationTypeEnum;

    title: string;

    message: string;

    meta: any;

    isRead: boolean;
}
