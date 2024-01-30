import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Section as SectionComponent } from './index';
import { Button, Descriptions } from 'antd';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/Section/Section',
    component: SectionComponent,
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
        children: {
            description: `Children's content`,
        },
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SectionComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SectionComponent> = (args) => (
    <SectionComponent {...args} />
);

export const Section = Template.bind({});

Section.args = {
    title: 'Section Header',
    children: (
        <Descriptions column={1}>
            <Descriptions.Item label="ID">2</Descriptions.Item>
            <Descriptions.Item label="Name">John Cena</Descriptions.Item>
            <Descriptions.Item label="No Telephone">
                +628521341231
            </Descriptions.Item>
            <Descriptions.Item label="Email">john@cena.com</Descriptions.Item>
        </Descriptions>
    ),
};

export const SectionWithAction = Template.bind({});

SectionWithAction.args = {
    title: 'Section Header',
    children: (
        <Descriptions column={1}>
            <Descriptions.Item label="ID">2</Descriptions.Item>
            <Descriptions.Item label="Name">John Cena</Descriptions.Item>
            <Descriptions.Item label="No Telephone">
                +628521341231
            </Descriptions.Item>
            <Descriptions.Item label="Email">john@cena.com</Descriptions.Item>
        </Descriptions>
    ),
    actions: <Button>Add Data</Button>,
};

export const SectionWithDivider = Template.bind({});

SectionWithDivider.args = {
    title: 'Section Header',
    children: (
        <Descriptions column={1}>
            <Descriptions.Item label="ID">2</Descriptions.Item>
            <Descriptions.Item label="Name">John Cena</Descriptions.Item>
            <Descriptions.Item label="No Telephone">
                +628521341231
            </Descriptions.Item>
            <Descriptions.Item label="Email">john@cena.com</Descriptions.Item>
        </Descriptions>
    ),
    actions: <Button>Add Data</Button>,
    divider: true,
};
