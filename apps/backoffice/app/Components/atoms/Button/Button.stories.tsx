import { EyeOutlined } from '@ant-design/icons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button as ButtonComponent } from './index';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Atoms/Button',
    component: ButtonComponent,
    argTypes: {
        icon: {
            description: `Icon elements`,
        },
        responsive: {
            description:
                'Used for optional rendering children in mobile breakpoint',
            control: { type: 'boolean' },
        },
        children: {
            description: 'ReactNode elements',
        },
        href: {
            description: 'Href link that used for Link component from Inertia',
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Extended from antd with adjusted spacing and sizing. <br> for more info: https://ant.design/components/button',
            },
        },
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ButtonComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonComponent> = (args) => (
    <ButtonComponent {...args} />
);

export const Button = Template.bind({});

Button.args = {
    children: 'Detail',
    icon: <EyeOutlined />,
};
