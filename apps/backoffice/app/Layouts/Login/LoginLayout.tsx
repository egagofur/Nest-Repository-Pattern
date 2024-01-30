import { Col, Layout, Row } from 'antd';
import React from 'react';
import { isMobileScreen } from '../../Utils/utils';

type TLoginLayout = {
    children: React.ReactNode;
    title: string;
};

const { Content } = Layout;

export const LoginLayout: React.FC<TLoginLayout> = ({ children }) => {
    const isMobile = isMobileScreen();

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Content
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row style={{ width: '100%' }}>
                        <Col span={isMobile ? 24 : 10}>
                            {/* Apps Logo or Title */}
                            <img
                                src="/img/logo-dot.svg"
                                width="80px"
                                style={{ margin: '1.5rem' }}
                            />

                            {children}
                        </Col>

                        <Col span={isMobile ? 24 : 14}>
                            <img
                                src={'/img/ilustration-login.png'}
                                alt="ilustration login"
                                width={'100%'}
                                height={'100%'}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};
