import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DataTable as DataTableComponent } from './index';
import { TFilterItem } from '../FilterSection/Filter';
import { Input } from 'antd';
import { ItemType } from './Entities';
import { ShareAltOutlined } from '@ant-design/icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Organisms/DataTable',
    component: DataTableComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DataTableComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataTableComponent> = (args) => (
    <DataTableComponent {...args} />
);

export const DataTable = Template.bind({});

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '3',
        name: 'Doe',
        age: 22,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const batchActionMenus: ItemType[] = [
    {
        key: '1',
        label: 'Delete',
        onClick: console.log,
        icon: <ShareAltOutlined />,
        style: { width: '151px' },
    },
];

const filterComponents: TFilterItem[] = [
    {
        label: 'Checkbox',
        type: 'CheckboxDropdown',
        name: 'checkbox',
        placeholder: 'Checkbox Dropdown',
        options: [{ label: 'Checkbox 1', value: 'checkbox 1' }],
        defaultValue: ['checkbox 1'],
    },
    {
        label: 'Email',
        render: Input,
        name: 'email',
        placeholder: 'Search email',
    },
    {
        label: 'Gender',
        type: 'Select',
        name: 'gender',
        placeholder: 'Gender',
        options: [
            { label: 'Pria', value: 'Male' },
            { label: 'Wanita', value: 'Female' },
        ],
        defaultValue: 'Male',
    },
    {
        label: 'Created At',
        type: 'DateRangePicker',
        name: 'created_at',
        range: 10,
    },
];

const pagination = { current: 1, total: 3, pageSize: 3 };

DataTable.args = {
    dataSource,
    columns,
    batchActionMenus,
    filterComponents,
    onChange: console.log,
    pagination: pagination,
    rowKey: 'key',
    loading: false,
};
