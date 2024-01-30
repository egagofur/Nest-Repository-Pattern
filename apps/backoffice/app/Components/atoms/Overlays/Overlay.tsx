import React from 'react';

interface IOverlayProps {
    onClick: () => void;
}

const Overlay = (props: IOverlayProps) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
            }}
            {...props}
        />
    );
};

export default Overlay;
