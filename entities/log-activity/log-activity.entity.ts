import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'log_activities' })
export class LogActivity implements ILogActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: IUser;

    @Column({ name: 'meta_data', type: 'json', nullable: true })
    metaData: any;

    @Column({ name: 'source', nullable: true })
    source: string;

    @Column({ name: 'activity' })
    activity: string;

    @Column({ name: 'menu', nullable: true })
    menu: string;

    @Column({ name: 'path', nullable: true })
    path: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;
}
