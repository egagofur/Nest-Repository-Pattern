import React, { useState } from 'react';
import {
    Row,
    Col,
    Button,
    Space,
    Form,
    FormProps,
    Dropdown,
    Typography,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

interface IProps extends FormProps {
    fieldsForm?: React.ReactNode[];
    gutter?: number;
    columnSpan?: number;
    layout?: 'horizontal' | 'vertical' | 'inline';
    closeModal: () => void;
}

const containerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    minWidth: '765px',
    minHeight: '292px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px',
};
const containerButtonStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'end',
};

const MenuContainer: React.FC<IProps> = ({
    fieldsForm,
    columnSpan = 12,
    layout = 'vertical',
    closeModal,
    ...rest
}: IProps) => {
    const handleCloseModal = () => {
        closeModal();
        rest.form.resetFields();
    };

    return (
        <Form style={containerStyle} layout={layout} {...rest}>
            <Typography.Title
                style={{ fontSize: '14px', marginBottom: '24px' }}
            >
                Filter by
            </Typography.Title>
            <Row gutter={[32, 0]}>
                {fieldsForm.map((field, key) => (
                    <Col key={key} span={columnSpan}>
                        {field}
                    </Col>
                ))}
            </Row>
            <Row justify="end">
                <Col span={6} style={containerButtonStyle}>
                    <Space size="middle">
                        <Button htmlType="button" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    );
};

export const MultiFilterDropdown: React.FC<Omit<IProps, 'closeModal'>> = (
    props: Omit<IProps, 'closeModal'>,
) => {
    const [open, setOpen] = useState(false);

    return (
        <Dropdown
            open={open}
            onOpenChange={(flag) => setOpen(flag)}
            dropdownRender={() => (
                <MenuContainer {...props} closeModal={() => setOpen(false)} />
            )}
        >
            <Button
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                icon={<FilterOutlined />}
            >
                {props.title}
            </Button>
        </Dropdown>
    );
};
