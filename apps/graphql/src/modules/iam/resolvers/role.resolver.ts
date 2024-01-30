import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { RoleCrudApplication } from '../applications/role-crud.application';
import { Role } from '../types/role.type';

@Resolver(() => Role)
export class RoleResolver {
    constructor(private roleApplication: RoleCrudApplication) {}

    @Query(() => Role)
    async role(@Args('id', { type: () => Int }) id: number) {
        return this.roleApplication.findById(id);
    }

    @Query(() => [Role])
    async roles() {
        return this.roleApplication.getAll();
    }
}
