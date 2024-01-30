import BN from 'bn.js';
import { ValueTransformer } from 'typeorm';
import { BigNumber } from 'bignumber.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TransformBN: ValueTransformer = {
    to: (value?: BN) => (value ? value.toString() : value),
    from: (value?: string) => (value ? new BN(value) : value),
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TransformBigNumber: ValueTransformer = {
    to: (value?: BigNumber) => (value ? value.toString() : value),
    from: (value?: string) => (value ? new BigNumber(value) : value),
};

function isNullOrUndefined<T>(
    obj: T | null | undefined,
): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ColumnNumericTransformer: ValueTransformer = {
    to(data: number | null): number | null {
        if (!isNullOrUndefined(data)) {
            return data;
        }

        return null;
    },
    from(data: string): number {
        if (!isNullOrUndefined(data)) {
            const num = Number(data);
            if (!Number.isNaN(num)) return num;
        }

        return null;
    },
};
