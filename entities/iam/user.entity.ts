import { GenderEnum, IUser } from 'interface-models/iam/user.interface';
import {
    AfterInsert,
    AfterUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from './role.entity';
import { BaseEntity } from 'entities/base.entity';
import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { GlobalService } from 'apps/backoffice/src/modules/glob/service/global-service.service';
import { LogActivityDto } from 'entities/log-activity/dto/log-activity.dto';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Role)
    @JoinTable({ name: 'user_roles' })
    roles: IRole[];

    @Column()
    fullname: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ name: 'identity_number', unique: true })
    identityNumber: string;

    @Column({ name: 'phone_number', unique: true })
    phoneNumber: string;

    @Column({ name: 'one_signal_player_ids', nullable: true, type: 'json' })
    @Transform((value) => JSON.stringify(value))
    oneSignalPlayerIds: string[];

    @Column({ name: 'email_verified_at', nullable: true })
    emailVerifiedAt: Date;

    @Column({ name: 'phone_verified_at', nullable: true })
    phoneNumberVerifiedAt: Date;

    @Column({ name: 'gender' })
    gender?: GenderEnum = GenderEnum.LakiLaki;

    @Column({ name: 'birth_date', nullable: true })
    birthDate?: Date;

    @AfterUpdate()
    async createLogActivityUpdate() {
        const logActivity: LogActivityDto = {
            menu: LogActivityMenuEnum.USER,
            path: __filename,
            user: null, // get user from jwt
            metaData: this,
            source: this.id.toString(),
            activity: 'Update user',
        };

        GlobalService.createLogActivity(logActivity);
    }

    @AfterInsert()
    async createLogActivityInsert() {
        const logActivity: LogActivityDto = {
            menu: LogActivityMenuEnum.USER,
            path: __filename,
            user: null, // get user from jwt
            metaData: this,
            source: this.id.toString(),
            activity: 'Create new user',
        };

        GlobalService.createLogActivity(logActivity);
    }
}
