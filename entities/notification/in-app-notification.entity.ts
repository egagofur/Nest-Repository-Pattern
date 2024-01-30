import { BaseEntity } from 'entities/base.entity';
import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';
import {
    IInAppNotification,
    NotificationTypeEnum,
} from 'interface-models/notification/in-app-notification.interface';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'in_app_notifications' })
export class InAppNotification
    extends BaseEntity
    implements IInAppNotification
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'target_user_id' })
    targetUser: IUser;

    @Column({ name: 'target_user_id' })
    targetUserId: number;

    @Column({ name: 'type' })
    type: NotificationTypeEnum;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'message' })
    message: string;

    @Column({ name: 'meta', type: 'json', nullable: true })
    meta: any;

    @Column({ name: 'is_read' })
    isRead: boolean;
}
