/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
import React from 'react';
import {
    Form,
    Checkbox,
    Button,
    Input,
    Typography,
    Space,
    notification,
    Row,
    Col,
} from 'antd';
import { LoginLayout } from '../Layouts';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Link } from '@inertiajs/inertia-react';
import { doLogin } from '../Modules/Auth/Login/Actions';
import { TLogin } from '../Modules/Auth/Login/Entities';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import { createYupSync, isMobileScreen } from '../Utils/utils';
import { themeColors } from '../Utils/theme';
import { FormContainer } from '../Components/organisms/FormContainer';

const schema: yup.SchemaOf<TLogin> = yup.object().shape({
    email: yup
        .string()
        .email('Field Email wajib berformat email')
        .required('Field Email wajib diisi'),
    password: yup.string().required('Field Password wajib diisi'),
});

const formItemSpacingStyle = {
    marginBottom: '16px',
};

const Login = (props: TInertiaProps) => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm<TLogin>();

    const isMobile = isMobileScreen();

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: string) => {
        if (type === 'error') {
            api.error({
                message: 'Error',
                description: 'Terjadi Kesalahan',
                placement: 'topRight',
            });
        }
        if (type === 'success') {
            api.success({
                message: 'Success',
                description: 'Welcome Joen Doe',
                placement: 'topRight',
            });
        }
    };

    const onSubmit = (loginData: TLogin): void => {
        doLogin(loginData);
    };

    return (
        <LoginLayout title="Login">
            {contextHolder}

            <Row align="middle" justify="center" style={{ height: '80%' }}>
                <Col
                    span={24}
                    style={{ padding: `4rem ${isMobile ? '' : '7rem'}` }}
                >
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography.Title level={4}>
                            Welcome back!
                        </Typography.Title>
                        <Typography.Text style={{ opacity: 0.5 }}>
                            Ant Design is the most influential web design
                            specification in Xihu district
                        </Typography.Text>
                    </Space>

                    <FormContainer
                        form={form}
                        name="basic"
                        labelAlign="left"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        errors={props.error}
                        style={{ paddingTop: '2.5rem' }}
                        onFinish={onSubmit}
                        className="login-form"
                    >
                        <Form.Item
                            name="email"
                            rules={[yupSync]}
                            style={formItemSpacingStyle}
                        >
                            <Input
                                placeholder="Username"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[yupSync]}
                            style={formItemSpacingStyle}
                        >
                            <Input.Password
                                placeholder="Password"
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item style={formItemSpacingStyle}>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Link
                                href="/auth/forgot-password"
                                className="login-form-forgot"
                                style={{ color: themeColors.primary }}
                            >
                                Forgot Password?
                            </Link>
                        </Form.Item>
                        <Form.Item style={formItemSpacingStyle}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <Form.Item
                            style={{
                                textAlign: 'center',
                                ...formItemSpacingStyle,
                            }}
                        >
                            Or{' '}
                            <Link
                                href="/auth/forgot-password"
                                style={{ color: themeColors.primary }}
                            >
                                Register now!
                            </Link>
                            {' Or '}
                            <a
                                href="/auth/sso-oidc"
                                target="blank"
                                style={{ color: themeColors.primary }}
                            >
                                Login by SSO
                            </a>
                        </Form.Item>
                    </FormContainer>
                </Col>
            </Row>
        </LoginLayout>
    );
};
export default Login;
