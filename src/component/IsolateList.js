
const defaultSort = {
    field: 'id',
    order: 'DESC',
}

export const IsolateList = ({children, ...props}) => {
    const {
        basePath,
        resource, 
        filterDefaultValues,
        sort = defaultSort,
        perPage = 10,
        filter = {},
        debounce = 500,
    } = props;
    
}