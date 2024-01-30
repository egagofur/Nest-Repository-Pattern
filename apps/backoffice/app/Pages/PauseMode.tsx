import React from 'react';
import { LoginLayout } from '../Layouts';
import '../../public/css/error.css';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import { IPauseMode } from 'interface-models/mode/pause-mode.interface';

interface IProps extends TInertiaProps {
    data: IPauseMode;
}

const PauseMode: React.FC = (props: IProps) => {
    const { data } = props;

    return (
        <LoginLayout title="Error">
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>102</h1>
                    </div>
                    <h2>
                        {data.message}
                        <br />
                        <br />
                        Estimate time :
                        <br />
                        From <b>{data.startAt}</b> To <b>{data.endAt}</b>
                    </h2>
                </div>
            </div>
        </LoginLayout>
    );
};

export default PauseMode;
