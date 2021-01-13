import { useQuery } from "react-admin";
import useIsolateListParams from "./controller/useIsolateListParams";

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
    const [query, queryModifiers] = useIsolateListParams({
        resource,
        filterDefaultValues,
        sort,
        perPage,
        debounce
    });
    const { data, total, loading, error } = useQuery({
        type: 'getList',
        resource: resource,
        payload: {
            pagination: { page: query.page, perPage: query.perPage },
            sort: query.sort,
            filter: {...query.filter, ...filter}
        }
    })
}