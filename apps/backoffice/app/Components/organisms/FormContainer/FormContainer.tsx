import { Col, Form, FormProps, Grid, Row } from 'antd';
import { isMobileScreen } from '../../../Utils/utils';
import { setServerError } from 'apps/backoffice/app/Utils/utils';
import React, { useEffect } from 'react';
import ButtonFormAction from './ButtonFormAction';
import { TErrorProps } from '../../../Modules/Inertia/Entities';

export interface IFormProps extends FormProps {
    isFieldCentered?: boolean; //centered by field as point (use case: for form basic with horizontal layout)
    centered?: boolean; //centered by form as point
    justifyButton?: 'start' | 'end';
    buttonAction?: React.ReactNode[];
    errors: TErrorProps;
}

const FormContainer = (props: IFormProps): JSX.Element => {
    const {
        isFieldCentered,
        centered,
        justifyButton = 'end',
        buttonAction,
        children,
        errors,
        ...rest
    } = props;
    const { lg } = Grid.useBreakpoint();
    const isMobile = isMobileScreen();
    const checkIsFieldCentered = isMobile ? false : isFieldCentered;

    useEffect(() => {
        setServerError(errors, rest.form.setFields);
    }, [errors]);

    return (
        <Row justify={centered && !checkIsFieldCentered ? 'center' : 'start'}>
            <Col
                span={
                    centered ? (lg ? 10 : checkIsFieldCentered ? 16 : 24) : 24
                }
                offset={checkIsFieldCentered ? (lg ? 8 : 6) : 0}
            >
                <Form
                    {...rest}
                    layout={checkIsFieldCentered ? 'horizontal' : props.layout}
                    labelCol={
                        checkIsFieldCentered && {
                            span: 8,
                            style: checkIsFieldCentered && {
                                position: 'absolute',
                                transform: 'translateX(-100%)',
                            },
                        }
                    }
                    wrapperCol={checkIsFieldCentered && { span: 18 }}
                    style={{ ...props.style }}
                >
                    <>
                        {children}
                        <ButtonFormAction
                            justify={justifyButton}
                            buttonAction={buttonAction}
                            style={{
                                marginInlineEnd: isFieldCentered && '25%',
                            }}
                        />
                    </>
                </Form>
            </Col>
        </Row>
    );
};

export default FormContainer;
