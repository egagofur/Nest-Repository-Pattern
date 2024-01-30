import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UserCrudApplication } from '../applications/user-crud.application';
import { UpdateUserFullname, User } from '../types/user.type';

@Resolver((_of) => User)
export class UserMutation {
    constructor(private userApplication: UserCrudApplication) {}

    @Mutation((_returns) => User)
    async updateUser(
        @Args({ name: 'id', type: () => Int }) id: number,
        @Args('updateUserFullname') updateUserFullname: UpdateUserFullname,
    ) {
        return this.userApplication.update(id, updateUserFullname);
    }
}
