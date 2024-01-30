export const sortOrder = (params: {
    columnKey: string;
    order: string;
    sort: string;
}): 'ascend' | 'descend' | undefined => {
    return params.order !== undefined && params.sort === params.columnKey
        ? params.order === 'ASC'
            ? 'ascend'
            : 'descend'
        : undefined;
};
