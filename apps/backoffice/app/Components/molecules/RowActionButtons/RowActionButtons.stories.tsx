import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RowActionButtons as RowActionButtonsComponent } from './index';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/RowActionButtons/RowActionButtons',
    component: RowActionButtonsComponent,
    argTypes: {
        actions: {
            description: 'List of button with IRowActionButtonProps',
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'List of the action button, including detail, edit and delete buttons that used in DataTable components. <br/> More about IRowActionButtonProps in Components/molecules/RowActionButtons/RowActionButtons directory',
            },
        },
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof RowActionButtonsComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RowActionButtonsComponent> = (args) => (
    <RowActionButtonsComponent {...args} />
);

export const RowActionButtons = Template.bind({});

RowActionButtons.args = {
    actions: [
        {
            type: 'view',
            href: `#`,
            title: 'view',
        },
        {
            type: 'edit',
            href: `#`,
            title: 'edit',
        },
        {
            type: 'delete',
            title: 'delete',
            onClick: () => {
                // TODO : handle delete function
            },
        },
    ],
};
