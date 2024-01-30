import React from 'react';
import { LoginLayout } from '../Layouts';
import '../../public/css/error.css';

const MaintainMode: React.FC = () => {
    return (
        <LoginLayout title="Error">
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>101</h1>
                    </div>
                    <h2>
                        Maintain mode, we'll back ASAP. thank you for waiting
                        for us
                    </h2>
                </div>
            </div>
        </LoginLayout>
    );
};

export default MaintainMode;
