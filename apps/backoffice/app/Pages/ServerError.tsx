import React from 'react';
import { LoginLayout } from '../Layouts';
import '../../public/css/error.css';

const Dashboard = (): JSX.Element => {
    return (
        <LoginLayout title="Error">
            <div id="server-error">
                <div className="server-error">
                    <div className="server-error-500">
                        <h1>500</h1>
                    </div>
                    <h2>Oops, Server Error!</h2>
                    <br />
                    <a href="/">Return To Homepage</a>
                </div>
            </div>
        </LoginLayout>
    );
};

export default Dashboard;
