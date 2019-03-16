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
        overviewData: data
    };
}

export const saveOverviewDataFail = (error = '') => {
    return {
        type: actionTypes.SAVE_OVERVIEW_DATA_FAIL,
        error: error
    };
}

export const saveOverviewDataStart = () => {
    return {
        type: actionTypes.SAVE_OVERVIEW_DATA_START,
    };
}

export const saveOverviewData = (patchDoc, salesData) => {
    return async dispatch => {
        try {
            dispatch(saveOverviewDataStart());
            const saveData = async () => {
                return axios.patch('api/sales/salecollection', patchDoc)
                    .then(res => res);   
            }

            const response = await saveData();

            if(response.status === 204){
                dispatch(saveOverviewDataSuccess(salesData))
            }
            else{
                dispatch(saveOverviewDataFail())
            }
        }
        catch(err) {
            dispatch(saveOverviewDataFail(err))
        }
    }
}