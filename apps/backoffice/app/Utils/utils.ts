import { FormInstance, RuleObject, RuleRender } from 'antd/es/form';
import { AnyObject } from 'yup/lib/types';
import { useMediaQuery } from 'react-responsive';
import { TErrorProps, TValidationError } from '../Modules/Inertia/Entities';
import { notification } from 'antd';
import { format } from 'date-fns';

/* 
    How to Use
    
    1. Define: 
        const yupSync = createYupSync(schema)
    2. Assign to props rules in FormItem
        rules={[yupSync]}
*/

export const createYupSync = (schema: AnyObject): RuleObject | RuleRender => {
    const ruleWithCtx =
        (fieldName?: string): RuleRender =>
        (ctx: FormInstance): RuleObject => {
            const { getFieldsValue } = ctx;
            return {
                // field using any type to avoid issue type from ant design
                async validator({ field }: any) {
                    await schema.validateSyncAt(field, getFieldsValue());
                },
                required: schema.fields[fieldName]?.exclusiveTests?.required,
            };
        };

    function rule(param: string): RuleRender;
    function rule(param: FormInstance): RuleObject;
    function rule(param) {
        if (typeof param === 'string') return ruleWithCtx(param) as RuleRender;
        else return ruleWithCtx(undefined)(param) as RuleObject;
    }

    return rule;
};

export const isMobileScreen = () => {
    return useMediaQuery({ query: '(max-width: 767px)' });
};

export const setServerError = (
    error: TErrorProps,
    setFields: (fields: any[]) => void,
): void => {
    const fieldErrors = error?.errors as TValidationError[];
    if (error?.statusCode === 422 && fieldErrors?.length > 0) {
        // set server error validation
        fieldErrors?.map((err) => {
            setFields([
                {
                    name: err.property,
                    errors: err.message,
                },
            ]);
        });
    } else if (error?.message) {
        notification.error({
            message: error.message,
        });
    }
};

export const formatDate = (
    date: string | Date,
    pattern = 'yyyy-MM-dd H:i:s',
): string => {
    return format(new Date(date), pattern);
};

export const debounce = (fn: (...args: any[]) => any, delay: number) => {
    let timer;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};
