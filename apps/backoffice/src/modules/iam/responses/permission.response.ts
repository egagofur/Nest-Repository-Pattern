import { IPermission } from 'interface-models/iam/permission.interface';

export type PermissionResponse = Omit<IPermission, ''>;
