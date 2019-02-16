import axios from '../../axios/AxiosConfig';

import * as actionTypes from './actionTypes';

export const fetchOverviewDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_SUCCESS,
        overviewData: data,
    };
}

export const fetchOverviewDataFail = (error) => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_FAIL,
        error: error,
    };
}

export const fetchOverviewDataStart = () => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_START,
    };
}

export const fetchOverviewData = () => {
    return dispatch => {
        try {
            dispatch(fetchOverviewDataStart());
            const getData = async() => {
                return await axios.get('/sales.json');         
            }
            const overviewData = getData().then(res => res.data);
            dispatch(fetchOverviewDataSuccess(overviewData));
        }
        catch(err) {
            dispatch(fetchOverviewDataFail(err))
        }
    }
}