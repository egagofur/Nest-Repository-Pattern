import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckboxDropdown as CheckboxDropdownComponent } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/Dropdowns/CheckboxDropdown',
    component: CheckboxDropdownComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CheckboxDropdownComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckboxDropdownComponent> = (args) => (
    <CheckboxDropdownComponent {...args} />
);

export const CheckboxDropdown = Template.bind({});

CheckboxDropdown.args = {
    label: 'Dropdown',
    options: [
        { label: 'Checkbox 1', value: 'checkbox 1' },
        { label: 'Checkbox 2', value: 'checkbox 2' },
    ],
    value: ['checkbox 1'],
};
