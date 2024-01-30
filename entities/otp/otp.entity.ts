import { BaseEntity } from 'entities/base.entity';
import { IOtp } from 'interface-models/otp/otp.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'otps' })
export class Otp extends BaseEntity implements IOtp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    identifier: string;

    @Column()
    trial: number;

    @Column({ name: 'is_valid', default: false })
    isValid: boolean;

    @Column({ name: 'expired_at', nullable: true })
    expiredAt: Date;
}
