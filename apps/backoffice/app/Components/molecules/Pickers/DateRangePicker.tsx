import React, { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

export type TRangeValue = [Dayjs | null, Dayjs | null] | null;

export type TDateRangePicker = Omit<RangePickerProps, 'presets'> & {
    range?: number;
    onChange?: (val: TRangeValue) => void;
    // behaviour preset props
    // if props false = there is no preset at all
    // if props not set / undefined = use default preset
    // if props array = use preset from props
    presets?: RangePickerProps['presets'] | false;
    defaultValue?: TRangeValue | null;
};

const defaultPresets: RangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

export const DateRangePicker = ({
    onChange,
    range,
    presets,
    defaultValue,
    disabledDate,
    ...rest
}: TDateRangePicker) => {
    const [dates, setDates] = useState<TRangeValue>(defaultValue);
    const [value, setValue] = useState<TRangeValue>(defaultValue);

    const defaultDisabledDate = (current: Dayjs) => {
        if (!dates || !range) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > range;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > range;
        return !!tooEarly || !!tooLate;
    };

    const handleChange = (val) => {
        onChange(val);
        setValue(val);
    };

    const handleOnCalendarChange = (
        values: [dayjs.Dayjs, dayjs.Dayjs],
        formatString: [string, string],
        info,
    ) => {
        if (rest.onCalendarChange) {
            rest.onCalendarChange(values, formatString, info);
        }

        setDates(values);
    };

    const rangePickerPreset =
        presets === false ? [] : presets || defaultPresets;

    return (
        <DatePicker.RangePicker
            {...rest}
            value={dates || value}
            disabledDate={disabledDate || defaultDisabledDate}
            onChange={handleChange}
            onCalendarChange={handleOnCalendarChange}
            picker={rest.picker}
            presets={rangePickerPreset}
        />
    );
};
