import React, { useContext } from 'react';
import {
    DateRangePicker,
    TDateRangePicker,
} from '../../../molecules/Pickers/DateRangePicker';
import { FilterContext } from '../Filter';

export type StrictDateRangePickerProps = Pick<
    TDateRangePicker,
    'value' | 'onChange' | 'defaultValue' | 'range'
>;

const FilterDateRangePicker = (props: StrictDateRangePickerProps) => {
    const { isMobile } = useContext(FilterContext);
    const { value, onChange, defaultValue, range } = props;
    return (
        <DateRangePicker
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            range={range}
            style={{ width: isMobile && '100%' }}
            allowClear
        />
    );
};

export default FilterDateRangePicker;
