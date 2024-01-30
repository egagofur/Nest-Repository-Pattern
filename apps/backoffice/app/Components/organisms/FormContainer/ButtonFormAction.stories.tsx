import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonFormAction as ButtonFormActionComponents } from './index';
import { Button } from 'antd';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Organisms/FormContainer/ButtonFormAction',
    component: ButtonFormActionComponents,
    argTypes: {
        justify: {
            description: `Justify button position at start or end of Form`,
        },
        buttonAction: {
            description: `List of button can be single or multiple button action in the form`,
        },
        style: {
            description: `Style for Row components as wrapper the list of button`,
        },
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ButtonFormActionComponents>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonFormActionComponents> = (args) => (
    <ButtonFormActionComponents {...args} />
);

export const ButtonFormAction = Template.bind({});

ButtonFormAction.args = {
    justify: 'end',
    buttonAction: [
        <Button>Cancel</Button>,
        <Button type="primary">Submit</Button>,
    ],
};
