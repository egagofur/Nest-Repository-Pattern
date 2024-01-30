import * as yup from 'yup';
import React from 'react';
import { Form, Space, Input, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { LoginLayout } from '../Layouts';
import { Link } from '@inertiajs/inertia-react';
import { sendEmailForgotPassword } from '../Modules/Auth/ForgotPassword/Action';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import { TForgotPassword } from '../Modules/Auth/ForgotPassword/Entities';
import { createYupSync } from '../Utils/utils';

const schema: yup.SchemaOf<TForgotPassword> = yup.object().shape({
    email: yup
        .string()
        .email('Field Email wajib berformat email')
        .required('Field Email wajib diisi'),
});

const ForgotPassword = (props: TInertiaProps) => {
    const yupSync = createYupSync(schema);

    const [form] = Form.useForm<TForgotPassword>();

    //TODO Open notification when success / failed request new password
    // const [api, contextHolder] = notification.useNotification();

    // const openNotification = (type: string) => {
    //     if (type === 'error') {
    //         api.error({
    //             message: 'Error',
    //             description: 'Terjadi Kesalahan',
    //             placement: 'topRight'
    //         })
    //     }
    //     if (type === 'success') {
    //         api.success({
    //             message: 'Success',
    //             description: 'Welcome Joen Doe',
    //             placement: 'topRight'
    //         })
    //     }

    // }

    const onSubmit = (loginData: TForgotPassword) => {
        sendEmailForgotPassword(loginData);
    };

    return (
        <LoginLayout title="Forgot Password">
            <Space
                size={16}
                direction="vertical"
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    alignItems: 'center',
                    paddingTop: '4rem',
                }}
            >
                <Typography.Title>Ant Design</Typography.Title>
                <Typography.Text style={{ opacity: 0.5 }}>
                    Ant Design is the most influential web design specification
                    in Xihu district
                </Typography.Text>
            </Space>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ offset: 4, span: 16 }}
                labelAlign="left"
                initialValues={{ remember: true }}
                autoComplete="off"
                style={{ backgroundColor: 'white', padding: '4rem' }}
                onFinish={onSubmit}
            >
                <Form.Item name="email" rules={[yupSync]}>
                    <Input placeholder="Email" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 4, span: 16 }}
                    validateStatus="error"
                    help={props?.error?.message}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Send
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Link href="/auth/login">Back to Login Admin?</Link>
                </Form.Item>
            </Form>
        </LoginLayout>
    );
};

export default ForgotPassword;
