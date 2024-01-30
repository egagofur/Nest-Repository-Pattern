import { BaseEntity } from 'entities/base.entity';
import { IConfig } from 'interface-models/config/config.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'configs' })
export class Config extends BaseEntity implements IConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    key: string;

    @Column()
    value: string;
}
