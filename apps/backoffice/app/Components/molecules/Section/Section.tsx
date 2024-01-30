import { Card, CardProps } from 'antd';
import React, { PropsWithChildren } from 'react';
import { ISectionHeaderProps, SectionHeader } from './SectionHeader';

type SectionProps = ISectionHeaderProps & Omit<CardProps, 'title'>;

export const Section: React.FC<PropsWithChildren<SectionProps>> = (props) => {
    const { title, actions, divider, ...cardProps } = props;
    return (
        <Card {...cardProps}>
            {props.title && (
                <SectionHeader
                    title={title}
                    actions={actions}
                    top={true}
                    divider={divider}
                />
            )}
            {props.children}
        </Card>
    );
};
