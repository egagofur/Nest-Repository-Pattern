import React from 'react';
import { Spin } from 'antd';

const blurLayoutStyle: React.CSSProperties = {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
};
const spinnerContainer: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
};

export const PageProgress = () => {
    return (
        <>
            <div style={blurLayoutStyle}></div>
            <div style={spinnerContainer}>
                <Spin size="large" />
            </div>
        </>
    );
};
