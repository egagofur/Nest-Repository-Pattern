import React from 'react';
import { MainLayout } from '../../Layouts/MainLayout';
import { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../../Utils/hooks';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { DataTable } from '../../Components/organisms/DataTable';
import { paginationTransform } from '../../Components/organisms/DataTable/DataTable';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { Route, route } from '../../Common/Route/Route';
import { useModal } from '../../Utils/modal';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IMovieSchedule } from 'interface-models/movie-schedule/movie-schedule.interface';
import { deleteScheuleService } from '../../Modules/schedule/Action';

interface IProps extends TInertiaProps {
    data: IMovieSchedule[];
}

const IndexPage = (props: IProps): React.ReactElement => {
    const {
        filters,
        implementTableFilter,
        status: { isFetching },
    } = useTableFilter();

    const columns: ColumnsType<IMovieSchedule> = [
        {
            title: 'Movie ID',
            dataIndex: 'movieId',
            align: 'center',
            render(value: string, record: IMovieSchedule): React.ReactNode {
                return record.movieId.id;
            },
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            align: 'center',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: 'center',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            align: 'center',
            render: (value, record) => (
                <RowActionButtons
                    actions={[
                        {
                            type: 'edit',
                            href: route(Route.MovieScheduleEdit, {
                                id: record.id,
                            }),
                            title: 'edit',
                        },
                        {
                            type: 'delete',
                            title: 'delete',
                            onClick: (): void => {
                                useModal({
                                    title: 'Are You Sure? ',
                                    type: 'confirm',
                                    variant: 'danger',
                                    onOk: () => deleteScheuleService(record.id),
                                });
                            },
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <MainLayout
            title="Schedule CRUD Sehari"
            topActions={
                <Button
                    href={Route.MovieScheduleCreate}
                    size="large"
                    type="primary"
                    icon={<PlusOutlined />}
                >
                    Schedule
                </Button>
            }
        >
            <DataTable
                columns={columns}
                dataSource={props.data}
                search={filters.search}
                onChange={implementTableFilter}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default IndexPage;
