import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from './ability.factory';

export interface IRequiredRule {
    action: Action;
    subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: IRequiredRule[]) =>
    SetMetadata(CHECK_ABILITY, requirements);
