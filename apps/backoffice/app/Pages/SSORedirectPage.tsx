import React from 'react';
import { LoginLayout } from '../Layouts';
import { Button, Col, Row, Space } from 'antd';

const SSORedirectPage = (): JSX.Element => {
    return (
        <LoginLayout title="Error">
            <Row align="middle" justify="center" style={{ height: '80%' }}>
                <Col>
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <h1>Success Login SSO</h1>
                        <Button
                            onClick={() => {
                                window.location.href = '/auth/sso-oidc';
                            }}
                        >
                            Back To Main Page
                        </Button>
                    </Space>
                </Col>
            </Row>
        </LoginLayout>
    );
};

export default SSORedirectPage;
