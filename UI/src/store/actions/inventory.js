import axios from '../../axios/AxiosConfig';

import * as actionTypes from './actionTypes';

export const fetchInventoryDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_INVENTORY_DATA_SUCCESS,
        inventoryData: data
    };
}

export const fetchInventoryDataFail = (error) => {
    return {
        type: actionTypes.FETCH_INVENTORY_DATA_FAIL,
        error: error
    };
}

export const fetchInventoryDataStart = () => {
    return {
        type: actionTypes.FETCH_INVENTORY_DATA_START
    };
}

export const fetchInventoryData = () => {
    return dispatch => {
        try {
            dispatch(fetchInventoryDataStart());
            const getData = async() => {
                return await axios.get('api/inventories');
            }
            dispatch(getData().then(res => 
                dispatch(fetchInventoryDataSuccess(res.data))
            ));
        }
        catch(err) {
            dispatch(fetchInventoryDataFail(err));
        }
        
    }
}

export const saveInventoryDataSuccess = (data) => {
    return {
        type: actionTypes.SAVE_INVENTORY_DATA_SUCCESS,
        overviewData: data,
    };
}

export const saveInventoryDataFail = (error) => {
    return {
        type: actionTypes.SAVE_INVENTORY_DATA_FAIL,
        error: error,
    };
}

export const saveInventoryDataStart = () => {
    return {
        type: actionTypes.SAVE_INVENTORY_DATA_START,
    };
}

export const saveInventoryData = (newData) => {
    return dispatch => {
        try {
            dispatch(saveInventoryDataStart());
            const postData = async() => {
                return await axios.post('/inventory.json', newData);   
            }
            dispatch(postData().then( res => 
                dispatch(saveInventoryDataSuccess(res.data))
            ));
        }
        catch(err) {
            dispatch(saveInventoryDataFail(err))
        }
    }
}