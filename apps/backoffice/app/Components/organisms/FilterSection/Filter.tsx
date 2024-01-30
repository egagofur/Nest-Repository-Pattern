import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, FormInstance, Row, Typography } from 'antd';
import { debounce, isMobileScreen } from 'apps/backoffice/app/Utils/utils';
import InputCollection, { StrictSelectProps } from './InputCollection';
import { StrictDateRangePickerProps } from './InputCollection/DateRangePicker';
import { FilterOutlined } from '@ant-design/icons';
import { StrictCheckboxDropdown } from './InputCollection/CheckboxDropdown';

export type InternalHooks = {
    registerWatch: (
        FC: (store: Record<string, any>, name: string[][]) => void,
    ) => () => void;
};
export interface IFilterFormInstance<T = any> extends FormInstance<T> {
    getInternalHooks: (mark: string) => InternalHooks;
}
export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

type RegisterFilterItem<
    P extends Record<string, any>,
    N extends string | undefined,
> = P & {
    label: string;
    type?: N;
    name: string;
};

type CustomFilterProps = {
    render: React.FC;
};

export type TFilterItem =
    | RegisterFilterItem<StrictSelectProps, 'Select'>
    | RegisterFilterItem<StrictDateRangePickerProps, 'DateRangePicker'>
    | RegisterFilterItem<StrictCheckboxDropdown, 'CheckboxDropdown'>
    | RegisterFilterItem<CustomFilterProps, undefined>;

export interface IFilterProps {
    filters: TFilterItem[];
    onChange: (store: Record<string, any>, context: TFilterItem[]) => void;
}

interface IFilterContextValues {
    isMobile?: boolean;
}

export const FilterContext = React.createContext<IFilterContextValues>({
    isMobile: undefined,
});

const Filter = ({ filters, onChange }: IFilterProps) => {
    const [form] = Form.useForm();
    const isMobile = isMobileScreen();
    const [open, setOpen] = useState(false);
    const [localStore, setLocalStore] = useState<Record<string, any>>({});

    const storeKeys = Object.keys(localStore);
    const isFilterUsed =
        storeKeys.length &&
        storeKeys.some(
            (key) =>
                localStore[key] !== null &&
                localStore[key] !== undefined &&
                localStore[key] !== '',
        );
    const handleStoreChangeDeb = debounce((store, name) => {
        // when navigating page,
        // registerWatch is assumed being triggered when unmounting component form item,
        // fortunatelly property unmounting form item does not exist in the store object,
        // and this condition is needed to prevent change parent state while navigating.
        if (!(name[0][0] in store)) return;
        onChange(store, filters);
        setLocalStore(store);
    }, 200);

    useEffect(() => {
        const { registerWatch } = (
            form as IFilterFormInstance
        ).getInternalHooks(HOOK_MARK);

        const cancelRegister = registerWatch(handleStoreChangeDeb);
        return cancelRegister;
    }, []);

    useEffect(() => {
        if (!isMobile) setOpen(false);
    }, [isMobile]);

    return (
        <FilterContext.Provider value={{ isMobile }}>
            <Form form={form}>
                <Row>
                    <Col xs={0} md={24}>
                        <Row gutter={[8, 0]} align="middle">
                            {filters?.map((filter) => (
                                <FilterItem key={filter.name} {...filter} />
                            ))}
                        </Row>
                    </Col>
                    <Col xs={24} md={0}>
                        <Button
                            type={isFilterUsed ? 'primary' : undefined}
                            onClick={() => setOpen(true)}
                            icon={
                                <FilterOutlined
                                    style={{ display: 'inline-flex' }}
                                />
                            }
                        />
                        <Drawer
                            title="Filters"
                            placement="right"
                            closable
                            onClose={() => setOpen(false)}
                            open={open}
                        >
                            <Row gutter={[8, 0]} align="middle">
                                {filters?.map((filter) => (
                                    <FilterItem key={filter.name} {...filter} />
                                ))}
                            </Row>
                        </Drawer>
                    </Col>
                </Row>
            </Form>
        </FilterContext.Provider>
    );
};

const FilterInputNotFound = () => <div></div>;

const FilterItem = (props: TFilterItem) => {
    const { name, type, label, ...rest } = props;
    const { isMobile } = useContext(FilterContext);

    const customFilterProps = props as CustomFilterProps;

    const Component =
        InputCollection[type] ||
        customFilterProps.render ||
        FilterInputNotFound;

    return (
        <Col
            style={{
                margin: isMobile ? '5px 0' : '2px',
                width: isMobile ? '100%' : 'initial',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {isMobile && <Typography.Text>{label}</Typography.Text>}
            <Form.Item name={name} noStyle>
                <Component {...(rest as any)} />
            </Form.Item>
        </Col>
    );
};

export default Filter;
