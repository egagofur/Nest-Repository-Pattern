import { Injectable } from '@nestjs/common';
import {
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
    PureAbility,
} from '@casl/ability';
import { User } from 'entities/iam/user.entity';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    createForUser(user: User) {
        const { can, build } = new AbilityBuilder<
            PureAbility<[Action, Subjects]>
        >(PureAbility as AbilityClass<AppAbility>);

        can(Action.Update, User), { userId: user.id }; // this code just example, replace if add other policy

        /*/ EXAMPLE POLICY /*/

        // can(Action.Update, Article, { userId: user.id }); // This code is used to validate the user whether it can update data or not based on the userid of the data

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
