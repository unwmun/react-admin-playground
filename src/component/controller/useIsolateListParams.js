import { useMemo } from "react";

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
    // 쿼리에 필요한 파라미터들 모임 인가?
    const requestSignature = [
        resource,
        params,
        filterDefaultValues,
        JSON.stringify(sort),
        perPage
    ];
    const query = useMemo(() => {})
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