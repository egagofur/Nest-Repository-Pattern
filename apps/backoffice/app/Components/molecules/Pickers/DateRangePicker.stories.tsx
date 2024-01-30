import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateRangePicker } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/Pickers',
    component: DateRangePicker,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DateRangePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateRangePicker> = (args) => (
    <DateRangePicker {...args} />
);

export const DateRangePickerMolecule = Template.bind({});

export const DateRangePickerRange = Template.bind({});

DateRangePickerRange.args = {
    range: 7,
};

export const DateRangePickerNoPresets = Template.bind({});

DateRangePickerNoPresets.args = {
    presets: false,
};
