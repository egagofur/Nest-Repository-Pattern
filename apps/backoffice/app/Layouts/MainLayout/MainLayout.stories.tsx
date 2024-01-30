import React from 'react';
import { InertiaApp, Link } from '@inertiajs/inertia-react';
import { FileExcelOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MainLayout as MainLayoutComponent } from './index';
import { ConfigProvider } from 'antd';
import { globalThemeConfig } from '../../Utils/theme';
import { AppProvider } from '../../Contexts/App';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Layouts/MainLayout',
    component: MainLayoutComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof MainLayoutComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MainLayoutComponent> = (args) => (
    <ConfigProvider theme={globalThemeConfig}>
        <AppProvider>
            <InertiaApp
                initialPage={{
                    version: '1',
                    component: '/',
                    props: {
                        ...args,
                        errors: {},
                    },
                    url: '/',
                    rememberedState: {},
                    resolvedErrors: {},
                    scrollRegions: [
                        {
                            top: 0,
                            left: 0,
                        },
                    ],
                }}
                resolveComponent={() => ''}
                initialComponent={MainLayoutComponent as any}
            />
        </AppProvider>
    </ConfigProvider>
);

export const MainLayout = Template.bind({});

MainLayout.args = {
    title: 'Title',
    breadcrumbs: [
        {
            label: 'Dashboard',
            path: '/',
        },
    ],
    topActions: [
        <Button icon={<FileExcelOutlined />} responsive={true}>
            Import
        </Button>,
        <Link href="users/create">
            <Button
                icon={<PlusCircleOutlined />}
                type="primary"
                responsive={true}
            >
                New User
            </Button>
        </Link>,
    ],
};
