import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FilterSection as FilterSectionComponent } from './index';
import { TFilterItem } from '../FilterSection/Filter';
import { Input } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { ItemType } from '../DataTable/Entities';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Organisms/FilterSection/FilterSection',
    component: FilterSectionComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FilterSectionComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FilterSectionComponent> = (args) => (
    <FilterSectionComponent {...args} />
);

export const FilterSection = Template.bind({});

const batchActionMenus: ItemType[] = [
    {
        key: '1',
        label: 'Delete',
        onClick: console.log,
        icon: <ShareAltOutlined />,
        style: { width: '151px' },
    },
];

const filters: TFilterItem[] = [
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
        label: 'Created At',
        type: 'DateRangePicker',
        name: 'created_at',
        range: 10,
    },
];

const selectedRows = [1];

FilterSection.args = {
    batchActionMenus,
    filters,
    selectedRows,
    onSearch: console.log,
    onFilterChange: console.log,
    loading: false,
};
