import React, { useContext } from 'react';
import { MainLayout } from '../../Layouts/MainLayout';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { IMovie } from 'interface-models/movie/movie.interface';

import { useForm } from 'antd/es/form/Form';
import { createYupSync } from '../../Utils/utils';
import { AppContext } from '../../Contexts/App';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { Button, Form, Input } from 'antd';
import { Section } from '../../Components/molecules/Section';
import {
    createMovieService,
    updateMovieService,
} from '../../Modules/movie/Action';
import { BasicDatePicker } from '../../Components/molecules/Pickers/BasicDatePicker';

import * as yup from 'yup';

export const SchemaMovie = yup.object().shape({
    title: yup
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(255, 'Title must be at least 3 characters')
        .required('Title is required'),
    overview: yup
        .string()
        .min(3, 'Overview must be at least 3 characters')
        .max(255, 'Overview must be at least 3 characters')
        .required('Overview is required'),
    poster: yup
        .string()
        .url('Poster must be a valid URL')
        .required('Poster is required'),
    playUntil: yup.string().required('Play until is required'),
});

interface IProps extends TInertiaProps {
    data: IMovie;
    isUpdate: boolean;
}

const FormMovie = (props: IProps): React.ReactElement => {
    const yupSync = createYupSync(SchemaMovie);
    const [form] = useForm();
    const [isLoading, setIsLoading] = React.useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (): Promise<void> => {
        setIsLoading(true);

        const data = form.getFieldsValue();
        try {
            await form.validateFields();
            props.isUpdate
                ? updateMovieService(props.data.id, data)
                : createMovieService(data);
            notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const onReset = (): void => {
        form.resetFields();
    };

    return (
        <React.Fragment>
            <MainLayout title={props.isUpdate ? 'Edit Movie' : 'Add Movie'}>
                <Section>
                    <FormContainer
                        errors={props.error}
                        initialValues={props.isUpdate && props.data}
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        centered
                        disabled={isLoading}
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
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[yupSync]}
                            required
                        >
                            <Input placeholder="Input title" />
                        </Form.Item>
                        <Form.Item
                            label="Overview"
                            name="overview"
                            rules={[yupSync]}
                            required
                        >
                            <Input placeholder="Input overview" />
                        </Form.Item>
                        <Form.Item
                            label="Poster"
                            name="poster"
                            rules={[yupSync]}
                            required
                        >
                            <Input type="url" placeholder="Input valid link" />
                        </Form.Item>
                        <Form.Item
                            label="Play Until"
                            name="playUntil"
                            rules={[yupSync]}
                            required
                        >
                            <BasicDatePicker
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </FormContainer>
                </Section>
            </MainLayout>
        </React.Fragment>
    );
};

export default FormMovie;
