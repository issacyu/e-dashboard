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
    return dispatch => {
        try {
            dispatch(fetchSaleDataStart());
            const getData = async() => {
                return await axios.get('api/sales');   
            }
            dispatch(getData().then( res => {
                dispatch(fetchSaleDataSuccess(res.data))
            }
            ));
        }
        catch(err) {
             dispatch(fetchSaleDataFail(err))
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
            const saveData = async () => {
                return axios.patch('api/sales/salecollection', patchDoc)
                    .then(res => res);   
            }

            const response = await saveData();

            if(response.status === 204){
                dispatch(saveSaleDataSuccess(salesData))
            }
            else{
                dispatch(saveSaleDataFail(response.statusText))
            }
        }
        catch(err) {
            dispatch(saveSaleDataFail(err))
        }
    }
}