import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormContainer as FormContainerComponents } from './index';
import { Button, Form, Input } from 'antd';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Organisms/FormContainer/FormContainer',
    component: FormContainerComponents,
    argTypes: {
        children: {
            description:
                'The rest of Form children, especially Form.Item and input components',
        },
        centered: {
            description: 'Centered a form',
        },
        isFieldCentered: {
            description:
                'Centered a form based on the field as point (used for horizontal layout)',
        },
        justifyButton: {
            description: 'Justify button position at start or end of Form',
            defaultValue: 'end',
        },
        buttonAction: {
            description:
                'List of button can be single or multiple button action in the form',
        },
        layout: {
            description: 'Layout of form',
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Extended component from Form antd with adjusted responsive, sizing and spacing values based on design system. <br> for more info: https://ant.design/components/form',
            },
        },
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FormContainerComponents>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormContainerComponents> = (args) => (
    <FormContainerComponents {...args} />
);

export const FormContainer = Template.bind({});

FormContainer.args = {
    buttonAction: [
        <Button>Cancel</Button>,
        <Button type="primary">Submit</Button>,
    ],
    children: (
        <>
            <Form.Item label="Full Name" name="fullname" required>
                <Input placeholder="Input" />
            </Form.Item>

            <Form.Item label="Email" name="email" required>
                <Input type="email" placeholder="Input" />
            </Form.Item>

            <Form.Item label="Password" name="password" required>
                <Input.Password placeholder="Input" />
            </Form.Item>
        </>
    ),
};
