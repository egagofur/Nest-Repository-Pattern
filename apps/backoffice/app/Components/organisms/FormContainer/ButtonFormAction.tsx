import { Row, Space } from 'antd';
import React, { CSSProperties } from 'react';

export interface IButtonFormActionProps {
    buttonAction: React.ReactNode[];
    justify: 'start' | 'end';
    style?: CSSProperties;
}

const ButtonFormAction = (props: IButtonFormActionProps) => {
    return (
        <Row
            justify={props.justify}
            style={{ marginTop: '24px', marginBottom: '8px', ...props.style }}
        >
            <Space>
                {props.buttonAction?.map((field, key) => (
                    <React.Fragment key={key}>{field}</React.Fragment>
                ))}
            </Space>
        </Row>
    );
};

export default ButtonFormAction;
