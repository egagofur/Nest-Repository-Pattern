import { Modal, ModalFuncProps } from 'antd';
import { themeColors } from './theme';

type TPropsModal = ModalFuncProps & {
    variant?: 'danger' | 'primary';
};

export const useModal = (props: TPropsModal) => {
    const getStyleOnOkButton = (variant: TPropsModal['variant']) => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.primary,
                };

            case 'danger':
                return {
                    backgroundColor: themeColors.error,
                    borderColor: themeColors.error,
                };

            default:
                break;
        }
    };

    return Modal[props.type]({
        ...props,
        okButtonProps: {
            style: {
                ...props.okButtonProps,
                ...getStyleOnOkButton(props.variant),
            },
            className: 'btn-modal',
        },
        cancelButtonProps: {
            className: 'btn-modal btn-modal__cancel',
        },
    });
};
