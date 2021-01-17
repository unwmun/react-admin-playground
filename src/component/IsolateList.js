import { Filter, ListContextProvider, Loading, Pagination, TextInput, useQuery } from "react-admin";
import { cloneElement } from "react";
import useIsolateListParams from "./controller/useIsolateListParams";
import keyBy from 'lodash/keyBy';

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
    });

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>ERROR: {error}</p>
    }
    return (
        <ListContextProvider
            value={{
                basePath: basePath,
                resource: resource,
                data: keyBy(data, 'id'),
                ids: data.map(({id}) => id),
                currentSort: sort ? sort : {},
                selectedIds: [],

                setSort: queryModifiers.setSort,
                setFilters: queryModifiers.setFilters,
                filterValues: query.filterValues,
            }}
        >
            <Filter>
                <TextInput label="검색" source="title" alwaysOn resettable />
            </Filter>
            {cloneElement(children)}
            <Pagination
                page={query.page}
                perPage={query.perPage}
                setPage={queryModifiers.setPage}
                total={total}
            />
        </ListContextProvider>
    );
}
