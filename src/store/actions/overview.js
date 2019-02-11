import * as actionTypes from './actionTypes';

export const fetchOverviewDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_SUCCESS,
        overviewData: data
    };
}

export const fetchOverviewDataFail = (error) => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_FAIL,
        error: error
    };
}

export const fetchOverviewDataStart = () => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_START
    };
}

export const fetchOverviewData = () => {
    return dispatch => {
        dispatch(fetchOverviewDataStart());
        // use axios to fetch data here.
    }
}