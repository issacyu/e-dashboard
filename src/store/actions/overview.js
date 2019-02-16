import axios from '../../axios/AxiosConfig';

import * as actionTypes from './actionTypes';

export const fetchOverviewDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_SUCCESS,
        overviewData: data,
        loading: false
    };
}

export const fetchOverviewDataFail = (error) => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_FAIL,
        error: error,
        loading: false
    };
}

export const fetchOverviewDataStart = () => {
    return {
        type: actionTypes.FETCH_OVERVIEW_DATA_START,
        loading: true
    };
}

export const fetchOverviewData = () => {
    return dispatch => {
        try {
            dispatch(fetchOverviewDataStart());
            const getData = async() => {
                return await axios.get('/sales.json');         
            }
            getData().then(res => console.log(res.data));
        }
        catch(err) {
            dispatch(fetchOverviewDataFail(err))
        }
    }
}