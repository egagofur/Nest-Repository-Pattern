import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { createYupSync } from '../../Utils/utils';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { Section } from '../../Components/molecules/Section';
import { AppContext } from '../../Contexts/App';
import { IProfileFormPassword } from '../../Modules/Profile/Entities';
import { editProfilePassword } from '../../Modules/Profile/Action';
import { TInertiaProps } from '../../Modules/Inertia/Entities';

const FormProfilePage: React.FC = (props: TInertiaProps) => {
    const [password, setPassword] = useState<string>();

    const schema: yup.SchemaOf<IProfileFormPassword> = yup.object().shape({
        password: yup
            .string()
            .required('Field password is required')
            .min(8, 'Password at least have 8 character')
            .test(
                'isFormatValid',
                'At least password has include 1 number and Alphabet',
                (value) => {
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    setPassword(value);

                    if (hasNumber && hasUpperCase) {
                        return true;
                    }

                    return false;
                },
            ),
        passwordConfirm: yup
            .string()
            .required('Field password is required')
            .min(8, 'Password at least have 8 character')
            .test(
                'isFormatValid',
                'Password confirmation must match with password',
                (value) => password == value,
            ),
    });

    const yupSync = createYupSync(schema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async () => {
        setIsLoading(true);
        const data = form.getFieldsValue();

        try {
            await form.validateFields();
            editProfilePassword(data);
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
        <Layout
            title="Edit Password"
            breadcrumbs={Breadcrumbs.Profile.EDITPASSWORD}
        >
            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
                    errors={props.error}
                    layout="vertical"
                    centered
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
                        label="Password"
                        name="password"
                        rules={[yupSync]}
                        required
                    >
                        <Input.Password type="password" placeholder="Input" />
                    </Form.Item>

                    <Form.Item
                        label="Password Confirmation"
                        name="passwordConfirm"
                        rules={[yupSync]}
                        required
                    >
                        <Input.Password type="password" placeholder="Input" />
                    </Form.Item>
                </FormContainer>
            </Section>
        </Layout>
    );
};

export default FormProfilePage;
