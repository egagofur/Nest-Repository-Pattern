import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SectionHeader as SectionHeaderComponent } from './index';
import { Button } from 'antd';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/Section/SectionHeader',
    component: SectionHeaderComponent,
    argTypes: {
        title: {
            description: `Header's title of section`,
        },
        divider: {
            description: `Divider under the header's title`,
        },
        top: {
            description:
                'Set position header on top (adjusted with the default components',
        },
        actions: {
            description: 'Action in headers',
        },
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SectionHeaderComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SectionHeaderComponent> = (args) => (
    <SectionHeaderComponent {...args} />
);

export const SectionHeader = Template.bind({});

SectionHeader.args = {
    title: 'Section Header',
};

export const SectionHeaderTopPosition = Template.bind({});

SectionHeaderTopPosition.args = {
    title: 'Section Header',
    top: true,
};

export const SectionHeaderWithDivider = Template.bind({});

SectionHeaderWithDivider.args = {
    title: 'Section Header',
    divider: true,
};

export const SectionHeaderWithActions = Template.bind({});

SectionHeaderWithActions.args = {
    title: 'Section Header',
    actions: <Button type="primary">Add Data</Button>,
    top: true,
    divider: true,
};
