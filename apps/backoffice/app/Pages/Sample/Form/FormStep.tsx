import { CheckCircleFilled, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Row,
    Select,
    Space,
    Steps,
    Typography,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { Section } from '../../../Components/molecules/Section';
import { TInertiaProps } from 'apps/backoffice/app/Modules/Inertia/Entities';

const { Option } = Select;

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="62">+62</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

const FormStep: React.FC = (props: TInertiaProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = async (values: any) => {
        setIsLoading(true);
        await form.validateFields();
        setIsLoading(false);
        console.log('Received values of form: ', values);
    };

    const description = 'This is a description.';

    return (
        <Layout title="Add Data" breadcrumbs={Breadcrumbs.Users.CREATE}>
            <Section>
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Finished',
                            description,
                        },
                        {
                            title: 'In Progress',
                            description,
                        },
                        {
                            title: 'Waiting',
                            description,
                        },
                    ]}
                    style={{
                        padding: '0  80px',
                        paddingBottom: '32px',
                        paddingTop: '8px',
                    }}
                />

                {current < 2 ? (
                    <FormContainer
                        initialValues={{
                            prefix: '62',
                            name: 'John Doe',
                            division: ['Industry'],
                            suffix: 'USD',
                        }}
                        errors={props.error}
                        onFinish={onFinish}
                        form={form}
                        layout="vertical"
                        requiredMark="optional"
                        centered
                        buttonAction={[
                            <Button type="link">Cancel</Button>,
                            <Button onClick={prev}>Previous</Button>,
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={isLoading}
                                onClick={next}
                            >
                                Next
                            </Button>,
                        ]}
                    >
                        <Typography.Paragraph style={{ opacity: '65%' }}>
                            These are instructions in the form layout to fill in
                            the fields so that they conform to the rules
                        </Typography.Paragraph>

                        <Form.Item label="Name" name="name" required>
                            <Input placeholder="Input" />
                        </Form.Item>

                        <Form.Item name="division" label="Division" required>
                            <Select placeholder="Select" mode="multiple">
                                <Option value="Industry">
                                    Department of Industry
                                </Option>
                                <Option value="Business">
                                    Department of Business
                                </Option>
                                <Option value="IT">
                                    Department of Information and Technology
                                </Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            tooltip="Distinctively monetize cost effective networks for cross-media bandwidth"
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item label="Description" name="description">
                            <TextArea placeholder="Textarea" />
                        </Form.Item>

                        <Form.Item
                            name="upload"
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            tooltip="upload file"
                        >
                            <Upload name="logo" action="/upload.do">
                                <Button icon={<UploadOutlined />}>
                                    Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </FormContainer>
                ) : (
                    <Row justify="center">
                        <Space
                            direction="vertical"
                            align="center"
                            style={{
                                paddingTop: '42px',
                                paddingBottom: '72px',
                                textAlign: 'center',
                            }}
                        >
                            <CheckCircleFilled
                                style={{ fontSize: 63, color: '#52C41A' }}
                            />

                            <Typography.Title
                                level={2}
                                style={{ marginTop: '1rem', marginBottom: 0 }}
                            >
                                This is result title
                            </Typography.Title>

                            <Typography.Paragraph style={{ opacity: '45%' }}>
                                Objectively scale orthogonal collaboration and
                                idea-sharing after enterprise-wide manufactured
                                products.
                                <br />
                                Compellingly strategize high-quality niche
                                markets through sustainable.
                            </Typography.Paragraph>

                            <Button
                                type="primary"
                                onClick={() => setCurrent(0)}
                            >
                                Ok
                            </Button>
                        </Space>
                    </Row>
                )}
            </Section>
        </Layout>
    );
};

export default FormStep;
