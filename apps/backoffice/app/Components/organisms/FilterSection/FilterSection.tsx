import React, { useState } from 'react';
import {
    Col,
    Row,
    Input,
    MenuProps,
    Typography,
    Space,
    Dropdown,
    Divider,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobileScreen } from '../../../Utils/utils';
import { useDidUpdateEffect } from '../../../Utils/hooks';
import Filter, { TFilterItem } from './Filter';

export interface IFilterSection {
    filters?: TFilterItem[];
    onFiltersChange?: (
        values: Record<string, any>,
        filters: TFilterItem[],
    ) => void;
    selectedRows?: React.Key[];
    batchActionMenus: MenuProps['items'];
    onSearch?: (value: string) => void;
    searchValue?: string;
}

export const FilterSection = (props: IFilterSection) => {
    const [value, setValue] = useState(props.searchValue);

    const isMobile = isMobileScreen();

    useDidUpdateEffect(() => {
        const timeout = setTimeout(() => {
            if (value || (!value && props.searchValue.length > 0)) {
                props.onSearch(value);
            }
        }, 200);

        return () => {
            clearTimeout(timeout);
        };
    }, [value]);

    return (
        <Row gutter={[8, 0]} align="middle">
            {/* Batch Action */}
            {props.selectedRows?.length > 0 && props.batchActionMenus && (
                <Col>
                    <Space style={{ paddingRight: '8px' }}>
                        <Dropdown.Button
                            menu={{ items: props.batchActionMenus || [] }}
                            placement="bottom"
                        >
                            Action
                        </Dropdown.Button>
                        <Typography.Text style={{ color: '#006D75' }}>
                            {props.selectedRows.length} item selected
                        </Typography.Text>
                    </Space>
                    <Divider type="vertical" style={{ padding: '14px 0px' }} />
                </Col>
            )}

            {/* Filters */}
            <Filter onChange={props?.onFiltersChange} filters={props.filters} />

            {/* Search */}
            {props.onSearch && (
                <Col flex="auto">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        allowClear
                        style={{ margin: isMobile ? '5px 0' : '2px' }}
                    />
                </Col>
            )}
        </Row>
    );
};
