import React, { useContext } from 'react';
import { MainLayout } from '../../Layouts/MainLayout';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { useForm } from 'antd/es/form/Form';
import { createYupSync } from '../../Utils/utils';
import { AppContext } from '../../Contexts/App';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { Button, Form, Select } from 'antd';
import { Section } from '../../Components/molecules/Section';

import * as yup from 'yup';
import { IMovieSchedule } from 'interface-models/movie-schedule/movie-schedule.interface';
import { IMovie } from '../../Modules/movie/Entities';
import {
    createScheduleService,
    updateScheduleService,
} from '../../Modules/schedule/Action';
import { BasicDatePicker } from '../../Components/molecules/Pickers/BasicDatePicker';

export const SchemaSchedule = yup.object().shape({
    movieId: yup.string().required('Title is required'),
    startTime: yup
        .string()
        .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Start time must be a valid time',
        )
        .required('Start time is required'),
    endTime: yup
        .string()
        .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'End time must be a valid time',
        )
        .required('End time is required'),
    price: yup.string().min(0).required('Price is required'),
    date: yup.date().required('Date is required'),
});

interface IProps extends TInertiaProps {
    data: IMovieSchedule;
    movies?: IMovie[];
    isUpdate: boolean;
}

const FormSchedule = (props: IProps): React.ReactElement => {
    const yupSync = createYupSync(SchemaSchedule);
    const [form] = useForm();
    const [isLoading, setIsLoading] = React.useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (): Promise<void> => {
        setIsLoading(true);

        const data = form.getFieldsValue();
        try {
            await form.validateFields();
            props.isUpdate
                ? updateScheduleService(props.data.id, data)
                : createScheduleService(data);
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
            <MainLayout
                title={props.isUpdate ? 'Edit Schedule' : 'Add Schdule'}
            >
                <Section>
                    <FormContainer
                        errors={props.error}
                        initialValues={
                            props.isUpdate && {
                                ...props.data,
                                movieId: props.data.movieId.id,
                            }
                        }
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
                            label="Movie Name"
                            name="movieId"
                            rules={[yupSync]}
                        >
                            <Select>
                                {props.movies?.map((movie) => (
                                    <Select.Option
                                        key={movie.id}
                                        value={movie.id}
                                    >
                                        {movie.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Start Time"
                            name="startTime"
                            rules={[yupSync]}
                        >
                            <Select>
                                <Select.Option value="08:00">
                                    08:00
                                </Select.Option>
                                <Select.Option value="10:00">
                                    10:00
                                </Select.Option>
                                <Select.Option value="12:00">
                                    12:00
                                </Select.Option>
                                <Select.Option value="14:00">
                                    14:00
                                </Select.Option>
                                <Select.Option value="16:00">
                                    16:00
                                </Select.Option>
                                <Select.Option value="18:00">
                                    18:00
                                </Select.Option>
                                <Select.Option value="20:00">
                                    20:00
                                </Select.Option>
                                <Select.Option value="22:00">
                                    22:00
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="End Time"
                            name="endTime"
                            rules={[yupSync]}
                        >
                            <Select>
                                <Select.Option value="08:00">
                                    08:00
                                </Select.Option>
                                <Select.Option value="10:00">
                                    10:00
                                </Select.Option>
                                <Select.Option value="12:00">
                                    12:00
                                </Select.Option>
                                <Select.Option value="14:00">
                                    14:00
                                </Select.Option>
                                <Select.Option value="16:00">
                                    16:00
                                </Select.Option>
                                <Select.Option value="18:00">
                                    18:00
                                </Select.Option>
                                <Select.Option value="20:00">
                                    20:00
                                </Select.Option>
                                <Select.Option value="22:00">
                                    22:00
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Price" name="price" rules={[yupSync]}>
                            <Select>
                                <Select.Option value={25000}>
                                    Rp. 25.000
                                </Select.Option>
                                <Select.Option value={30000}>
                                    Rp. 30.000
                                </Select.Option>
                                <Select.Option value={35000}>
                                    Rp. 35.000
                                </Select.Option>
                                <Select.Option value={40000}>
                                    Rp. 40.000
                                </Select.Option>
                                <Select.Option value={45000}>
                                    Rp. 45.000
                                </Select.Option>
                                <Select.Option value={50000}>
                                    Rp. 50.000
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Date" name="date" rules={[yupSync]}>
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

export default FormSchedule;
