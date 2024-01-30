import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DescriptionContainer as DescriptionContainerComponent } from './index';
import { Descriptions } from 'antd';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/DescriptionContainer/DescriptionContainer',
    component: DescriptionContainerComponent,
    argTypes: {
        children: {
            description: `use Descriptions.Item component from Antd Design`,
        },
        layout: {
            description: 'horizontal | vertical',
            defaultValue: 'horizontal',
            options: ['horizontal', 'vertical'],
            control: { type: 'radio' },
        },
        size: {
            description: 'small | default | middle',
            defaultValue: 'small',
            options: ['small', 'default', 'middle'],
            control: { type: 'radio' },
        },
        bordered: {
            description: 'Bordered value',
            control: { type: 'boolean' },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Extended component from Descriptions antd with adjusted responsive, sizing and spacing values. <br> for more info: https://ant.design/components/descriptions',
            },
        },
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DescriptionContainerComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DescriptionContainerComponent> = (
    args,
) => <DescriptionContainerComponent {...args} />;

export const DescriptionContainer = Template.bind({});

DescriptionContainer.args = {
    children: (
        <>
            <Descriptions.Item label="ID">2</Descriptions.Item>
            <Descriptions.Item label="Name">John Cena</Descriptions.Item>
            <Descriptions.Item label="No Telephone">
                +628521341231
            </Descriptions.Item>
            <Descriptions.Item label="Email">john@cena.com</Descriptions.Item>
        </>
    ),
};
