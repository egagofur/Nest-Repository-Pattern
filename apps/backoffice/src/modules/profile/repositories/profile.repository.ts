import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/iam/user.entity';

@Injectable()
export class ProfileRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
}
