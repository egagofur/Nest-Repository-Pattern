import { Button, Col, Form, Input, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Section } from '../../../Components/molecules/Section';
import { DataTable } from '../../../Components/organisms/DataTable';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { ColumnsType } from 'antd/es/table';
import { IPermission } from 'interface-models/iam/permission.interface';
import { AppContext } from '../../../Contexts/App';
import { editRole } from 'apps/backoffice/app/Modules/Role/Action';
import { createYupSync } from 'apps/backoffice/app/Utils/utils';
import { IRoleForm } from 'apps/backoffice/app/Modules/Role/Entities';
import * as yup from 'yup';
import { IRole } from 'interface-models/iam/role.interface';

const schema: yup.SchemaOf<IRoleForm> = yup.object().shape({
    name: yup.string().required('Field role name is required'),
    key: yup.string().required('Field key is required'),
    permissions: yup
        .array()
        .of(yup.number().required('Field permissions is required')),
});

interface IProps extends TInertiaProps {
    data: IRole;
    permissions: IPermission[];
}

const columns: ColumnsType<IPermission> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Permission Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'key',
        dataIndex: 'key',
        key: 'key',
    },
];

const EditRolePage: React.FC = (props: IProps) => {
    const { id, key, name } = props.data;
    const dataPermission = props.permissions;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const [dataSource, setDataSource] = useState(dataPermission);

    useEffect(() => {
        setSelectedRowKeys(props.data.permissions.map((item) => item.id));
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const yupSync = createYupSync(schema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async () => {
        setIsLoading(true);
        const data = form.getFieldsValue();
        data.permissionIds = selectedRowKeys as number[];

        try {
            await form.validateFields();
            editRole(data, id);
            notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const filterData = (value: string) => {
        if (value) {
            const filteredData = dataPermission.filter(
                (entry) =>
                    entry.name.toLowerCase().includes(value.toLowerCase()) ||
                    entry.key.toLowerCase().includes(value.toLowerCase()),
            );
            setDataSource(filteredData);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Layout title="Edit Role" breadcrumbs={Breadcrumbs.Roles.EDIT}>
            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
                    errors={props.error}
                    layout="vertical"
                    buttonAction={[
                        <Button onClick={onReset}>Discard</Button>,
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
                            <Form.Item
                                rules={[yupSync]}
                                required
                                label="Role Name"
                                name="name"
                                initialValue={name}
                            >
                                <Input placeholder="Input" />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <Form.Item
                                rules={[yupSync]}
                                required
                                label="Key"
                                name="key"
                                initialValue={key}
                            >
                                <Input placeholder="Input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Section title="Permissions">
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `Selected ${selectedRowKeys.length} items`
                                : ''}
                        </span>
                        <DataTable
                            columns={columns}
                            dataSource={dataSource}
                            rowSelection={rowSelection}
                            rowKey={'id'}
                            onChange={(e) => {
                                filterData(e.search);
                            }}
                        />
                    </Section>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default EditRolePage;
