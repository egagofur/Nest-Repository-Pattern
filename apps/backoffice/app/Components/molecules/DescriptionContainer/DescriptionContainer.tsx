import { Descriptions, DescriptionsProps, Grid } from 'antd';
import { Breakpoint } from 'antd/es/_util/responsiveObserver';
import React, { useMemo } from 'react';

const DescriptionContainer = ({
    size = 'small',
    layout = 'horizontal',
    column = { lg: 2, md: 2, sm: 1, xs: 1 },
    ...props
}: DescriptionsProps) => {
    const { sm, md, lg, xl, xs, xxl } = Grid?.useBreakpoint();

    const getWidthLabelOnOneColumn = (
        columns: Record<Breakpoint, number>,
    ): string => {
        if (xxl && columns.xxl == 1) {
            return '4%';
        }
        if (xl && columns.xl == 1) {
            return '4%';
        }

        if (lg && columns.lg == 1) {
            return '4%';
        }

        if (md && columns.md == 1) {
            return '4%';
        }

        if (sm && columns.sm == 1) {
            return '25%';
        }

        if (xs && columns.xs == 1) {
            return '35%';
        }
    };

    const widthOneColumn = useMemo(() => {
        return getWidthLabelOnOneColumn(column as Record<Breakpoint, number>);
    }, [column, xs, sm, md, lg, xl, xxl]);

    return (
        <Descriptions
            size={size}
            layout={layout}
            labelStyle={{
                ...props.labelStyle,
                width:
                    props.bordered && layout == 'horizontal'
                        ? md && (column as Record<Breakpoint, number>).md != 1
                            ? '15%'
                            : widthOneColumn
                        : null,
            }}
            contentStyle={{
                ...props.contentStyle,
                width:
                    props.bordered && layout == 'horizontal'
                        ? md && '30%'
                        : null,
            }}
            column={column}
            {...props}
        >
            {props.children}
        </Descriptions>
    );
};

export default DescriptionContainer;
