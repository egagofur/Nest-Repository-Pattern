import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Space,
    Switch,
    TimePicker,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { DateRangePicker } from '../../../Components/molecules/Pickers';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Section } from '../../../Components/molecules/Section';
import { CheckboxDropdown } from 'apps/backoffice/app/Components/molecules/Dropdowns/CheckboxDropdown';
import { Uploader } from 'apps/backoffice/app/Components/molecules/Form';
import { TInertiaProps } from 'apps/backoffice/app/Modules/Inertia/Entities';

const { Option } = Select;

const normFile = (e: any) => {
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

const suffixSelector = (
    <Form.Item name="suffix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
        </Select>
    </Form.Item>
);

const FormBasic: React.FC = (props: TInertiaProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: any) => {
        setIsLoading(true);
        await form.validateFields();
        console.log(form.validateFields());
        setIsLoading(false);
        console.log('Received values of form: ', values);
    };

    return (
        <Layout title="Add Data" breadcrumbs={Breadcrumbs.Users.CREATE}>
            <Section>
                <FormContainer
                    form={form}
                    onFinish={onFinish}
                    errors={props.error}
                    initialValues={{
                        prefix: '62',
                        quantity: 3,
                        status: true,
                        suffix: 'USD',
                        rate: 4,
                        aggreement: true,
                        checkboxItem: 'A',
                    }}
                    isFieldCentered
                    centered
                    buttonAction={[
                        <Button>Cancel</Button>,
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Form.Item label="Email" name="email" required>
                        <Input type="email" placeholder="Input" />
                    </Form.Item>

                    <Form.Item label="Password" name="password" required>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="phone" label="Phone Number" required>
                        <Input
                            addonBefore={prefixSelector}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item label="Description" name="description" required>
                        <TextArea placeholder="Textarea" />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" required>
                        <Select placeholder="Select">
                            <Option value="Men">Men</Option>
                            <Option value="Woman">Woman</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="DatePicker" name="date" required>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="DatePickerRange"
                        name="dateRange"
                        required
                    >
                        <DateRangePicker
                            onChange={() => {
                                return;
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Time" name="time" required>
                        <TimePicker />
                    </Form.Item>

                    <Form.Item label="Quantity" name="quantity" required>
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status Active"
                        tooltip="Check status"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item name="button" label="Button" required>
                        <Button>Button</Button>
                    </Form.Item>

                    <Form.Item label="Price" name="price" required>
                        <InputNumber
                            addonAfter={suffixSelector}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item name="slider" label="Slider" required>
                        <Slider
                            /* eslint-disable @typescript-eslint/naming-convention */
                            marks={{
                                0: '0',
                                25: '100',
                                50: '200',
                                75: '300',
                                100: '400',
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="rate" label="Rate" required>
                        <Rate />
                    </Form.Item>

                    <Form.Item label="Dragger" tooltip="Upload file" required>
                        <Form.Item
                            name="dragger"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            noStyle
                        >
                            <Uploader
                                name="files"
                                action="/upload.do"
                                listType="picture"
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item name="status" label="Status" required>
                        <Radio.Group>
                            <Radio.Button value="a">item 1</Radio.Button>
                            <Radio.Button value="b">item 2</Radio.Button>
                            <Radio.Button value="c">item 3</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="item" label="Item" required>
                        <Radio.Group>
                            <Radio value="a">item 1</Radio>
                            <Radio value="b">item 2</Radio>
                            <Radio value="c">item 3</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="checkboxItem"
                        label="Item"
                        tooltip="Choose at least one"
                        required
                    >
                        <Checkbox.Group>
                            <Space>
                                <Checkbox
                                    value="A"
                                    style={{ lineHeight: '32px' }}
                                >
                                    Checbox
                                </Checkbox>
                                <Checkbox
                                    value="B"
                                    style={{ lineHeight: '32px' }}
                                >
                                    Checbox
                                </Checkbox>
                                <Checkbox
                                    value="C"
                                    style={{ lineHeight: '32px' }}
                                >
                                    Checbox
                                </Checkbox>
                            </Space>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.List name="names">
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field) => (
                                    <Form.Item
                                        label={'Fields'}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                            ]}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        "Please input passenger's name or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="passenger name"
                                                style={{ width: '60%' }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() =>
                                                    remove(field.name)
                                                }
                                                style={{ marginLeft: 6 }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Add field
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item name="agreement" valuePropName="checked">
                        <Checkbox>I have read the agreement</Checkbox>
                    </Form.Item>

                    <Form.Item label="Categories" name="categories" required>
                        <CheckboxDropdown
                            placeholder="Categories"
                            options={[
                                { label: 'Checkbox 1', value: 'checkbox 1' },
                            ]}
                        />
                    </Form.Item>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormBasic;
