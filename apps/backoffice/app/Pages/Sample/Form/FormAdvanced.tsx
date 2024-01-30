import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Row,
    Select,
    Space,
    TimePicker,
    Typography,
} from 'antd';
import React, { useMemo, useState } from 'react';
import { Section, SectionHeader } from '../../../Components/molecules/Section';
import { DataTable } from '../../../Components/organisms/DataTable';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { useTableFilter } from '../../../Utils/hooks';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';

type DataType = {
    key: string;
    name: string;
    age: number;
    address: string;
};

interface IEditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: DataType;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<IEditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const dataResource: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Select.Option value="62">+62</Select.Option>
            <Select.Option value="87">+87</Select.Option>
        </Select>
    </Form.Item>
);

const FormAdvanced = (props: TInertiaProps) => {
    const { implementTableFilter } = useTableFilter();

    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState(dataResource);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record: DataType) => record?.key === editingKey;

    const edit = (record: Partial<DataType> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record?.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as DataType;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const onDelete = async (key: React.Key) => {
        setData((data) => data.filter((item) => item.key != key));
        setEditingKey('');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            editable: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text: string, record: DataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Typography.Link onClick={() => save(record?.key)}>
                            Save
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => onDelete(record?.key)}
                        >
                            <Typography.Link>Delete</Typography.Link>
                        </Popconfirm>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ''}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = useMemo(() => {
        return columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: DataType) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });
    }, [columns]);

    const onFinish = async (values: any) => {
        setIsLoading(true);

        try {
            await form.validateFields();
            console.log('Received values of form: ', values);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Layout title="Add Data" breadcrumbs={Breadcrumbs.Users.CREATE}>
            <Section title="Form Advanced">
                <FormContainer
                    onFinish={onFinish}
                    initialValues={{ prefix: '62' }}
                    form={form}
                    errors={props.error}
                    layout="vertical"
                    requiredMark="optional"
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
                    <Row gutter={32}>
                        {/* Row 1 */}
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item label="Input Label" name="name">
                                <Input placeholder="Input" />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item label="Time" name="time">
                                <TimePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item name="division" label="Input Label">
                                <Select placeholder="Select">
                                    <Select.Option value="Industry">
                                        Department of Industry
                                    </Select.Option>
                                    <Select.Option value="Business">
                                        Department of Business
                                    </Select.Option>
                                    <Select.Option value="IT">
                                        Department of Information and Technology
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        {/* Row 2 */}
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item name="division" label="Input Label">
                                <Select placeholder="Select">
                                    <Select.Option value="Industry">
                                        Department of Industry
                                    </Select.Option>
                                    <Select.Option value="Business">
                                        Department of Business
                                    </Select.Option>
                                    <Select.Option value="IT">
                                        Department of Information and Technology
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item label="Time" name="time">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item label="Input Label" name="name">
                                <Input placeholder="Input" />
                            </Form.Item>
                        </Col>

                        {/* Row 3 */}
                        <Col sm={24} md={12} lg={8}>
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
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item label="Input Label" name="name">
                                <Input placeholder="Input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <SectionHeader title="Section Table List" top divider />

                    <DataTable
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        onChange={implementTableFilter}
                        columns={mergedColumns}
                        dataSource={data}
                        rowKey="id"
                        pagination={paginationTransform(props.meta)}
                    />
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormAdvanced;
