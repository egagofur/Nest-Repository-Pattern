import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PermissionCrudApplication } from '../applications/permission-crud.application';
import { Permission } from '../types/permission.type';

@Resolver(() => Permission)
export class PermissionResolver {
    constructor(private permissionApplication: PermissionCrudApplication) {}

    @Query(() => Permission)
    async permission(@Args('id', { type: () => Int }) id: number) {
        return this.permissionApplication.findById(id);
    }

    @Query(() => [Permission])
    async permissions() {
        return this.permissionApplication.getAll();
    }
}
