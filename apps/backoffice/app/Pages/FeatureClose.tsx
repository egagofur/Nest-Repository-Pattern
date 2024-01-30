import React from 'react';
import { LoginLayout } from '../Layouts';
import '../../public/css/error.css';

const MaintainMode: React.FC = () => {
    return (
        <LoginLayout title="Error">
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>104</h1>
                    </div>
                    <h2>
                        Feature Close, we'll back ASAP. thank you for waiting
                    </h2>
                </div>
            </div>
        </LoginLayout>
    );
};

export default MaintainMode;
