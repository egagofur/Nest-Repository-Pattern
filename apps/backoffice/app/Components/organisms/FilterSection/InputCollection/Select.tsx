import React, { useContext } from 'react';
import { Select, SelectProps } from 'antd';
import { FilterContext } from '../Filter';

export type StrictSelectProps = Pick<
    SelectProps,
    'value' | 'onChange' | 'options' | 'defaultValue' | 'placeholder'
>;

const FilterSelect = (props: StrictSelectProps) => {
    const { isMobile } = useContext(FilterContext);
    const { value, onChange, options, defaultValue, placeholder } = props;
    return (
        <Select
            value={value}
            onChange={onChange}
            options={options}
            defaultValue={defaultValue}
            placeholder={placeholder}
            allowClear
            style={{ width: isMobile ? '100%' : '90px' }}
        />
    );
};

export default FilterSelect;
