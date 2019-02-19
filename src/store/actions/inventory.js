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
                return await axios.post('/sales/-LYsoA9rchXHr56gRPpY.json', newData);   
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