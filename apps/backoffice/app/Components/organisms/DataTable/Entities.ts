import type { TableProps } from 'antd/es/table';
import {
    ColumnType,
    FilterValue,
    SorterResult,
    TableAction,
} from 'antd/es/table/interface';

import React from 'react';
import {
    MenuDividerType,
    MenuItemGroupType,
    MenuItemType,
    SubMenuType,
} from 'antd/es/menu/hooks/useItems';
import { TFilterItem } from '../FilterSection/Filter';

export type TOrder = {
    order: 'ASC' | 'DESC' | undefined;
};

export type TOnSort<T> = Omit<SorterResult<T>, 'order'> & TOrder;

/* Custom types component Dropdown ant design for supporting passing selectedRowKeys from component DataTable */
export declare type MenuClickEventHandler = (
    info: MenuInfo,
    selectedRowKeys?: React.Key[],
) => void;

export type MenuInfo = {
    key: string;
    keyPath: string[];
    /** @deprecated This will not support in future. You should avoid to use this */
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

export interface IMenuItemType extends Omit<MenuItemType, 'onClick'> {
    onClick?: MenuClickEventHandler;
}
export interface ISubMenuType extends Omit<SubMenuType, 'onClick'> {
    onClick?: MenuClickEventHandler;
}
export type ItemType =
    | IMenuItemType
    | ISubMenuType
    | MenuItemGroupType
    | MenuDividerType
    | null;

export type DataTableSorter<T extends Record<string, any>> = {
    column?: ColumnType<T>;
    order?: 'DESC' | 'ASC' | null;
    field?: React.Key | readonly React.Key[];
    sort?: string;
};

export type DataTablePagination = {
    total?: number;
    page?: number;
    per_page?: number;
};

export type CustomFilter<X extends Record<string, any>> = X & {
    search?: string;
};

export interface ITableCurrentDataSource<RecordType> {
    action: TableAction | 'custom';
    currentDataSource?: RecordType[];
    customContext?: TFilterItem[];
}

export type FilterState<T, X = Record<string, any>> = {
    custom?: CustomFilter<X>;
    sorter?: DataTableSorter<T>;
    filters?: Record<string, FilterValue>;
    pagination?: DataTablePagination;
    extra?: ITableCurrentDataSource<T>;
};

export interface IDataTableProps<T, X = Record<string, any>>
    extends Omit<TableProps<T>, 'onChange'> {
    defaultCurrent?: number;
    batchActionMenus?: ItemType[];
    filterComponents?: TFilterItem[];
    search?: string;
    onChange?: (
        customFilter: CustomFilter<X>,
        sorter: DataTableSorter<T>,
        filters?: Record<string, FilterValue>,
        pagination?: DataTablePagination,
        extra?: ITableCurrentDataSource<T>,
    ) => void;
}
