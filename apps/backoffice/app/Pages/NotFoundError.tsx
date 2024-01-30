import React from 'react';
import { LoginLayout } from '../Layouts/';
import '../../public/css/error.css';

const Dashboard = (): JSX.Element => {
    return (
        <LoginLayout title="Error">
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops, The Page you are looking for can't be found!</h2>
                    <br />
                    <a href="/">Return To Homepage</a>
                </div>
            </div>
        </LoginLayout>
    );
};

export default Dashboard;
