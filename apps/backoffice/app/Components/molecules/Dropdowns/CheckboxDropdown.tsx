import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    CheckboxOptionType,
    Dropdown,
    Space,
    theme,
} from 'antd';
import { DownOutlined, CloseCircleFilled } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const { useToken } = theme;

export interface IPropsCheckboxDropdown {
    defaultValue?: CheckboxValueType[];
    placeholder?: React.ReactNode;
    options?: CheckboxOptionType[];
    value?: CheckboxValueType[];
    onChange?: (checkedValue: CheckboxValueType[]) => void;
    allowClear?: boolean;
}

interface IPropsCheckboxDropdownRender {
    options?: CheckboxOptionType[];
    value?: CheckboxValueType[];
    onChange?: (checkedValue: CheckboxValueType[]) => void;
}

const CheckboxDropdownRender: React.FC<IPropsCheckboxDropdownRender> = (
    props,
) => {
    const { options, value, onChange } = props;
    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        padding: 8,
    };

    return (
        <div style={contentStyle}>
            <Checkbox.Group value={value} onChange={onChange}>
                <Space direction="vertical">
                    {options?.map((option, index) => (
                        <Checkbox key={index} value={option.value}>
                            {option.label}
                        </Checkbox>
                    ))}
                </Space>
            </Checkbox.Group>
        </div>
    );
};

export const CheckboxDropdown: React.FC<IPropsCheckboxDropdown> = (props) => {
    const { placeholder, options, value, onChange, defaultValue, allowClear } =
        props;

    const [state, setState] = useState<CheckboxValueType[]>(
        value || defaultValue || [],
    );
    const handleOnChange = (value: CheckboxValueType[]) => {
        setState(value);
        onChange(value);
    };

    const handleOnClear = () => {
        handleOnChange([]);
    };

    const { token } = useToken();
    const [open, setOpen] = useState(false);

    const labelStyle: React.CSSProperties = {
        color: state?.length ? token.colorText : token.colorTextPlaceholder,
    };

    const iconClearStyle: React.CSSProperties = {
        color: token.colorTextPlaceholder,
        cursor: 'pointer',
    };

    return (
        <Dropdown
            open={open}
            onOpenChange={setOpen}
            dropdownRender={() => (
                <CheckboxDropdownRender
                    options={options}
                    value={state}
                    onChange={handleOnChange}
                />
            )}
        >
            <Button>
                <Space style={labelStyle}>
                    {placeholder}
                    {allowClear && state.length ? (
                        <CloseCircleFilled
                            onClick={handleOnClear}
                            style={iconClearStyle}
                        />
                    ) : (
                        <DownOutlined />
                    )}
                </Space>
            </Button>
        </Dropdown>
    );
};
