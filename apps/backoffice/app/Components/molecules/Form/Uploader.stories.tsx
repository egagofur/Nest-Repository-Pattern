import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CarOutlined } from '@ant-design/icons';

import { Uploader as UploaderMolecule } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Molecules/Form/Uploader',
    component: UploaderMolecule,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof UploaderMolecule>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UploaderMolecule> = (args) => (
    <UploaderMolecule {...args} />
);

export const Uploader = Template.bind({});

export const UploaderCustomText = Template.bind({});

UploaderCustomText.args = {
    text: 'Click or drag something to this area to upload',
    hint: 'Just Single Upload',
};

export const UploaderCustomIcon = Template.bind({});

UploaderCustomIcon.args = {
    icon: <CarOutlined />,
};
