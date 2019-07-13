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
    return async dispatch => {
        try {
            dispatch(fetchInventoryDataStart());

            const response = await axios.get('api/inventories');
            if(response.status === 200) {
                dispatch(fetchInventoryDataSuccess(response.data));
            }
            else {
                dispatch(fetchInventoryDataFail('Fail to get inventories with status code: ' + response.status
                + 'and status text: ' + response.statusText));
            }
        }
        catch(err) {
            dispatch(fetchInventoryDataFail(err));
        }
        
    }
}

export const saveInventoryDataSuccess = (data) => {
    return {
        type: actionTypes.SAVE_INVENTORY_DATA_SUCCESS,
        inventoryData: data,
    };
}

export const saveInventoryDataFail = (error = '') => {
    return {
        type: actionTypes.SAVE_INVENTORY_DATA_FAIL,
        error: error
    };
}

export const saveInventoryDataStart = () => {
    return {
        type: actionTypes.SAVE_INVENTORY_DATA_START,
    };
}

export const saveInventoryData = (patchDoc, inventoryData) => {
    return async dispatch => {
        try {
            dispatch(saveInventoryDataStart());

            const response = await axios.patch('api/inventories/inventorycollection', patchDoc);

            if(response.status === 204){
                dispatch(saveInventoryDataSuccess(inventoryData));
            }
            else{
                dispatch(saveInventoryDataFail('Fail to save inventories with status code: ' + response.status 
                + 'and status text: ' + response.statusText));
            }
        }
        catch(err) {
            dispatch(saveInventoryDataFail(err))
        }
    }
}