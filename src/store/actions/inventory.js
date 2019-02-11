import * as actionTypes from './actionTypes';

export const fetchInventoryDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_INVENTORY_DATA_SUCCESS,
        InventoryData: data
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
        dispatch(fetchInventoryDataStart());
        // use axios to fetch data here.
    }
}