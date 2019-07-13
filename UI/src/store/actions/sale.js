import axios from '../../axios/AxiosConfig';

import * as actionTypes from './actionTypes';

export const fetchSaleDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_SALE_DATA_SUCCESS,
        saleData: data,
    };
}

export const fetchSaleDataFail = (error) => {
    return {
        type: actionTypes.FETCH_SALE_DATA_FAIL,
        error: error
    };
}

export const fetchSaleDataStart = () => {
    return {
        type: actionTypes.FETCH_SALE_DATA_START,
    };
}

export const fetchSaleData = () => {
    return async dispatch => {
        try {
            dispatch(fetchSaleDataStart());
            const response = await axios.get('api/sales');
            if(response.status === 200) {
                dispatch(fetchSaleDataSuccess(response.data));
            }
            else {
                dispatch(fetchSaleDataFail('Fail to get sales with status code: ' + response.status
                + 'and status text: ' + response.statusText));
            }
        }
        catch(err) {
             dispatch(fetchSaleDataFail(err));
        }
    }
}

export const saveSaleDataSuccess = (data) => {
    return {
        type: actionTypes.SAVE_SALE_DATA_SUCCESS,
        saleData: data
    };
}

export const saveSaleDataFail = (error = '') => {
    return {
        type: actionTypes.SAVE_SALE_DATA_FAIL,
        error: error
    };
}

export const saveSaleDataStart = () => {
    return {
        type: actionTypes.SAVE_SALE_DATA_START,
    };
}

export const saveSaleData = (patchDoc, salesData) => {
    return async dispatch => {
        try {
            dispatch(saveSaleDataStart());

            const response = await axios.patch('api/sales/salecollection', patchDoc);

            if(response.status === 204){
                dispatch(saveSaleDataSuccess(salesData))
            }
            else{
                dispatch(saveSaleDataFail('Fail to save sales with status code: ' + response.status 
                + 'and status text: ' + response.statusText))
            }
        }
        catch(err) {
            dispatch(saveSaleDataFail(err))
        }
    }
}