import React from 'react';
import { MainLayout } from '../../Layouts/MainLayout';
import { ColumnsType } from 'antd/es/table';
import { IMovie } from 'interface-models/movie/movie.interface';
import { useTableFilter } from '../../Utils/hooks';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { DataTable } from '../../Components/organisms/DataTable';
import { paginationTransform } from '../../Components/organisms/DataTable/DataTable';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { Route, route } from '../../Common/Route/Route';
import { useModal } from '../../Utils/modal';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { deleteMovieService } from '../../Modules/movie/Action';

interface IProps extends TInertiaProps {
    data: IMovie[];
}

type TFilter = {
    tilte: string;
};

const IndexPage = (props: IProps): React.ReactElement => {
    const {
        filters,
        implementTableFilter,
        status: { isFetching },
    } = useTableFilter<TFilter>();

    const columns: ColumnsType<IMovie> = [
        {
            title: 'Title',
            dataIndex: 'title',
            align: 'center',
        },
        {
            title: 'Overview',
            dataIndex: 'overview',
            align: 'center',
        },
        {
            title: 'Poster',
            dataIndex: 'poster',
            align: 'center',
        },
        {
            title: 'Play Until',
            dataIndex: 'playUntil',
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
                            href: route(Route.MovieEdit, { id: record.id }),
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
                                    onOk: () => deleteMovieService(record.id),
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
            title="Movie CRUD Sehari"
            topActions={
                <Button
                    href={Route.MovieCreate}
                    size="large"
                    type="primary"
                    icon={<PlusOutlined />}
                >
                    Movie
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
