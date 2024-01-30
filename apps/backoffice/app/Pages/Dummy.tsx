import React from 'react';
import { MainLayout } from '../Layouts/MainLayout';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import ReactJson from 'react-json-view';

interface IProps extends TInertiaProps {
    title: string;
}

const DummyPage: React.FC = (props: IProps) => {
    return (
        <MainLayout title={'Dummy Page' + (props.title && `: ${props.title}`)}>
            <ReactJson src={props} />
        </MainLayout>
    );
};

export default DummyPage;
