import { Link } from '@inertiajs/inertia-react';
import { Breadcrumb, theme } from 'antd';
import React from 'react';
import { TBreadcrumbsItem } from '../../../Modules/Common/Entities';

type PropsBreadcrumb = {
    breadcrumbs: TBreadcrumbsItem[];
};

const Breadcrumbs = ({ breadcrumbs }: PropsBreadcrumb) => {
    const { token } = theme.useToken();
    return (
        <Breadcrumb style={{ marginBottom: '8px' }}>
            {breadcrumbs?.map(({ label, path }, index) => {
                const isLast = breadcrumbs.length === index + 1;
                return isLast ? (
                    <Breadcrumb.Item key={label}>
                        <span
                            style={{
                                color: token.colorTextSecondary,
                            }}
                        >
                            {label}
                        </span>
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item key={label}>
                        <Link href={path}>{label}</Link>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
