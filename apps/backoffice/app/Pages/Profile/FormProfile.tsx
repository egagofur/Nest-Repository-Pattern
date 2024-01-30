import { Button, Form, Input, Radio } from 'antd';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { createYupSync } from '../../Utils/utils';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { Section } from '../../Components/molecules/Section';
import { AppContext } from '../../Contexts/App';
import { IProfileForm } from '../../Modules/Profile/Entities';
import { editProfile } from '../../Modules/Profile/Action';
import { IProfile } from '../../Modules/User/Entities';
import { GenderEnum } from '../../../../../interface-models/iam/user.interface';
import { BasicDatePicker } from '../../Components/molecules/Pickers/BasicDatePicker';

const schema: yup.SchemaOf<IProfileForm> = yup.object().shape({
    fullname: yup.string().required('Field fullname is required'),
    email: yup.string().email().required('Field email is required'),
    phoneNumber: yup.string().required('Field phone number is required'),
    identityNumber: yup.string().required('Field identityNumber is required'),
    gender: yup.string().nullable(),
    birthDate: yup.string().nullable(),
});

interface IProps extends TInertiaProps {
    data: IProfile;
}

const FormProfilePage: React.FC = (props: IProps) => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async () => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            editProfile(data);
            notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Layout title="Edit Profile" breadcrumbs={Breadcrumbs.Profile.EDIT}>
            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    centered
                    initialValues={props.data}
                    errors={props.error}
                    buttonAction={[
                        <Button onClick={onReset}>Discard</Button>,
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                form
                                    .getFieldsError()
                                    .filter(({ errors }) => errors.length)
                                    .length > 0 && isLoading
                            }
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[yupSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[yupSync]}
                        required
                    >
                        <Input type="email" placeholder="Input" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[yupSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                    <Form.Item
                        label="Identity Number"
                        name="identityNumber"
                        rules={[yupSync]}
                        required
                    >
                        <Input placeholder="Input" />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender" required>
                        <Radio.Group>
                            <Radio.Button value={GenderEnum.LakiLaki}>
                                {GenderEnum.LakiLaki}
                            </Radio.Button>
                            <Radio.Button value={GenderEnum.Perempuan}>
                                {GenderEnum.Perempuan}
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Birth Date"
                        name="birthDate"
                        rules={[yupSync]}
                    >
                        <BasicDatePicker />
                    </Form.Item>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormProfilePage;
