import { useCallback, useMemo, useState } from "react";
import lodashDebounce from 'lodash/debounce';
import set from 'lodash/set';
import { queryReducer, removeEmpty, removeKey } from "react-admin";
import {SORT_ASC, SET_SORT, SET_PAGE, SET_PER_PAGE, SET_FILTER} from 'ra-core/esm/reducer/admin/resource/list/queryReducer';

const emptyObject = {};
const defaultSort = {
    field: 'id',
    order: SORT_ASC,
};
const defaultParams = {};

const useIsolateListParams = ({
    resource,
    filterDefaultValues,
    sort = defaultSort,
    perPage = 10,
    debounce = 500,
}) => {
    const [params, setParams] = useState(defaultParams);
    // 기본 값 모음
    const requestSignature = [
        resource,
        params,
        filterDefaultValues,
        JSON.stringify(sort),
        perPage
    ];
    const query = useMemo(() => // <---
        getQuery({
            params,
            filterDefaultValues, 
            sort, 
            perPage
        }),
        requestSignature
    );

    const changeParams = useCallback(action => {
        const newParams = queryReducer(query, action); // <--
        setParams(newParams);
    }, requestSignature);

    ///
    /// 상태 변경, set params
    ///
    // 정렬
    const setSort = useCallback((newSort) => changeParams({type: SET_SORT, payload: {sort: newSort}}), requestSignature);

    // 페이징
    const setPage = useCallback((newPage) => changeParams({type: SET_PAGE, payload: newPage}), requestSignature);
    const setPerPage = useCallback((newPerPage) => changeParams({type: SET_PER_PAGE, payload: newPerPage}), requestSignature);

    // 필터
    const filterValues = query.filter || emptyObject;
    const displayedFilterValues = query.displayedFilters || emptyObject;
    // 필터 - 입력대기 
    const debounceSetFilters = lodashDebounce((newFilters, newDisplayedFilters) => {
        let payload = {
            filter: removeEmpty(newFilters),
            displayedFilters: undefined,
        };
        if (newDisplayedFilters) {
            payload.displayedFilters = Object
                .keys(newDisplayedFilters)
                .reduce((filters, filter) => {
                    return newDisplayedFilters[filter] ? { ...filters, [filter]: true } : filters;
                }, {});
        }
        changeParams({
            type: SET_FILTER,
            payload
        })
    }, debounce);
    const setFilters = useCallback((filters, displayedFilters) => debounceSetFilters(filters, displayedFilters), requestSignature);
    const hideFilter = useCallback((filterName) => {
        const newFilters = removeKey(filterValues, filterName);
        const newDisplayedFilters = {
            ...displayedFilterValues, [filterName]: undefined
        }
        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature);
    const showFilter = useCallback((filterName, defaultValue) => {
        const newFilters = set(filterValues, filterName, defaultValue);
        const newDisplayedFilters = {
            ...displayedFilterValues, [filterName]: undefined
        }
        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature);

    return [
        {
            displayedFilters: displayedFilterValues,
            filterValues,
            requestSignature,
            ...query,
        },
        {
            changeParams,
            setPage,
            setPerPage,
            setSort,
            setFilters,
            hideFilter,
            showFilter,
        },
    ];
}

export const hasCustomParams = (params) => {
    return (
        params &&
        params.filter &&
        (Object.keys(params.filter).length > 0 ||
            params.order != null ||
            params.page !== 1 ||
            params.perPage != null ||
            params.sort != null)
    );
};

// 3개의 다른 값들을 병합하여 하나의 리스트 파라미터를 만든다.
// - 쿼리 스트링
// - 이전 네비게이션에서 쌓인 파라미터들
// - 리스트 컴포넌트로 부터 전달된 속성값들
export const getQuery = ({
    filterDefaultValues,
    params,
    sort,
    perPage,
}) => {
    const query = hasCustomParams(params) ? { ...params } : { filter: filterDefaultValues || {} };
    if (!query.sort) {
        query.sort = sort.field;
        query.order = sort.order;
    }
    if (!query.perPage) {
        query.perPage = perPage;
    }
    if (!query.page) {
        query.page = 1;
    }
    return {
        ...query,
        page: getNumberOrDefault(query.page, 1),
        perPage: getNumberOrDefault(query.perPage, 10)
    }
}

export const getNumberOrDefault = (possibleNumber, defaultValue) => 
    (typeof possibleNumber === 'string'
        ? parseInt(possibleNumber, 10)
        : possibleNumber) || defaultValue;

export default useIsolateListParams;