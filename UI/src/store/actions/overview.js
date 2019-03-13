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
                return await axios.get('api/sales');   
            }
            dispatch(getData().then( res => 
                dispatch(fetchOverviewDataSuccess(res.data))
            ));
        }
        catch(err) {
            dispatch(fetchOverviewDataFail(err))
        }
    }
}

export const saveOverviewDataSuccess = (data) => {
    return {
        type: actionTypes.SAVE_OVERVIEW_DATA_SUCCESS,
        overviewData: data,
    };
}

export const saveOverviewDataFail = (error) => {
    return {
        type: actionTypes.SAVE_OVERVIEW_DATA_FAIL,
        error: error,
    };
}

export const saveOverviewDataStart = () => {
    return {
        type: actionTypes.SAVE_OVERVIEW_DATA_START,
    };
}

export const saveOverviewData = (newData) => {
    return dispatch => {
        try {
            dispatch(saveOverviewDataStart());
            const postData = async() => {
                return await axios.post('/sales/-LYsoA9rchXHr56gRPpY.json', newData);   
            }
            dispatch(postData().then( res => 
                dispatch(saveOverviewDataSuccess(res.data))
            ));
        }
        catch(err) {
            dispatch(saveOverviewDataFail(err))
        }
    }
}