/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Index Application
 * Used to fetch paginated data with any sort, filter and search
 */

import { OrderDirectionType } from 'apps/api/src/common/enums/index.enum';
import {
    IPaginateRequest,
    IPaginateResponse,
    IPaginationMeta,
} from 'apps/api/src/common/interface/index.interface';

export abstract class IndexApplication {
    readonly DefaultPerPage: number = 10;
    readonly DefaultPage: number = 1;
    readonly DefaultSort: string = 'created_at';
    readonly DefaultOrder: OrderDirectionType = 'DESC';

    abstract fetch(arg0: any, arg1: any): Promise<IPaginateResponse<any>>;

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
