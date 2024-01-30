import { useEffect, useRef, useState, useMemo } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { IndexRequest } from '../../src/common/request/index.request';
import {
    DataTablePagination,
    DataTableSorter,
    ITableCurrentDataSource,
} from '../Components/organisms/DataTable/Entities';
import { FilterValue } from 'antd/es/table/interface';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDidUpdateEffect = (fn: () => void, inputs: any) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            return fn();
        } else {
            didMountRef.current = true;
        }
    }, inputs);
};

type TOrderAntD = 'ASC' | 'DESC' | undefined;

export type TPropsTableFilter<T> = Omit<IndexRequest, 'perPage' | 'order'> & {
    per_page?: number;
    order?: TOrderAntD;
} & T;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useTableFilter = <T = { [key: string]: any }>() => {
    const [status, setStatus] = useState({
        isFetching: false,
    });

    const [filters, setFilters] = useState<TPropsTableFilter<T> | any>(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filtersObj = {};
        for (const [key, value] of queryParams.entries()) {
            if (value !== '') filtersObj[key] = value;
        }
        return filtersObj;
    });

    const existingParams = useMemo(
        () =>
            Object.keys(filters).reduce(
                (a, c) => (filters[c] ? { ...a, [c]: filters[c] } : a),
                {},
            ),
        [filters],
    ) as TPropsTableFilter<T>;

    const setQueryParams = (propsParams: TPropsTableFilter<T>) => {
        const data = Object.keys(propsParams).reduce((all, key) => {
            if (propsParams[key] === '') delete all[key];
            else return { ...all, [key]: propsParams[key] };
            return all;
        }, existingParams) as TPropsTableFilter<T>;

        if (data.order === undefined) {
            delete data.sort;
        }

        const listPropsParams = Object.keys(propsParams) as string[];

        if (
            !(
                listPropsParams.includes('page') &&
                listPropsParams.includes('per_page')
            )
        ) {
            if (
                !(
                    listPropsParams.includes('sort') &&
                    listPropsParams.includes('order')
                )
            ) {
                data.page = 1;
            }
        }

        setFilters(data);

        Inertia.visit(window.location.pathname, {
            data: data,
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onBefore: () => {
                setStatus({
                    isFetching: true,
                });
            },
            onFinish: () => {
                setStatus({
                    isFetching: false,
                });
            },
        });
    };

    const implementTableFilter = (
        customFilter: T,
        sorter?: Omit<DataTableSorter<any>, 'column'>,
        filters?: Record<string, FilterValue>,
        pagination?: DataTablePagination,
        extra?: ITableCurrentDataSource<any>,
    ) => {
        const newCustomFilter: T = { ...customFilter };

        extra.customContext?.forEach((filter) => {
            if (!newCustomFilter[filter.name]) return;
            switch (filter.type) {
                case 'DateRangePicker': {
                    newCustomFilter[filter.name] = `${newCustomFilter[
                        filter.name
                    ][0]?.toISOString()},${newCustomFilter[
                        filter.name
                    ][1]?.toISOString()}`;
                    break;
                }
                case 'CheckboxDropdown': {
                    newCustomFilter[filter.name] =
                        newCustomFilter[filter.name]?.join(',');
                    break;
                }
            }
        });

        const strictSorter = {
            order: sorter?.order,
            sort: sorter?.sort,
        };

        setQueryParams({
            ...newCustomFilter,
            ...strictSorter,
            ...filters,
            ...pagination,
        });
    };

    return {
        implementTableFilter,
        setQueryParams,
        filters: filters as TPropsTableFilter<T>,
        status,
    };
};
