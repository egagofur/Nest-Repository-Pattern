/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Paginate Util
 * Used to paginate the data
 */

import { OrderDirectionType } from 'apps/backoffice/src/common/enums/index.enum';
import {
    IPaginateRequest,
    IPaginationMeta,
} from 'apps/backoffice/src/common/interface/index.interface';

export class PaginateUtil {
    readonly DefaultPerPage: number = 10;
    readonly DefaultPage: number = 1;
    readonly DefaultSort: string = 'created_at';
    readonly DefaultOrder: OrderDirectionType = 'DESC';

    countOffset({ page, perPage }: IPaginateRequest): number {
        page = page ?? this.DefaultPage;
        perPage = perPage ?? this.DefaultPerPage;

        return (page - 1) * perPage;
    }

    getOrder(order: string): 'ASC' | 'DESC' {
        return ['ASC', 'DESC'].indexOf(order) == 0 ? 'ASC' : 'DESC';
    }

    mapMeta(
        count: number,
        { page, perPage }: IPaginateRequest,
    ): IPaginationMeta {
        page = page ?? this.DefaultPage;
        perPage = perPage ?? this.DefaultPerPage;

        return {
            page: page,
            perPage: perPage,
            total: count,
            totalPage: Math.ceil(count / perPage),
        };
    }
}
