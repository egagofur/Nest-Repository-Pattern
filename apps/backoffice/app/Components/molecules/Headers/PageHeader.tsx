import { Col, Row, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { TBreadcrumbsItem } from 'apps/backoffice/app/Modules/Common/Entities';
import React from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
interface IProps {
    title: string;
    topActions?: React.ReactNode;
    breadcrumbs?: TBreadcrumbsItem[];
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            {props?.breadcrumbs?.length > 0 && (
                <Row>
                    <Breadcrumbs breadcrumbs={props.breadcrumbs} />
                </Row>
            )}
            <Row
                style={{
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Col flex="auto">
                    <Title
                        style={{
                            fontSize: '24px',
                            lineHeight: '32px',
                            marginBottom: 0,
                        }}
                    >
                        {props.title}
                    </Title>
                </Col>
                <Col>
                    <Space wrap>{props?.topActions && props.topActions}</Space>
                </Col>
            </Row>
        </>
    );
};
