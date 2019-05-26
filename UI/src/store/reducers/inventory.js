import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    inventoryData: [],
    categories: [],
    loading: false,
    error: ''
};

const fetchInventoryDataStart = (state) => {
    return updateObject(state, {loading: true});
}

const fetchInventoryDataSuccess = (state, action) => {
    return updateObject(state, {
        inventoryData: action.inventoryData,
        loading: false,
        error: ''
    })
}

const fetchInventoryDataFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const saveInventoryDataStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: ''
    });
}

const saveInventoryDataSuccess = (state, action) => {
    return updateObject(state, {
        inventoryData: action.inventoryData,
        loading: false,
        error: ''
    })
}

const saveInventoryDataFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_INVENTORY_DATA_START:
            return fetchInventoryDataStart(state);
        case actionTypes.FETCH_INVENTORY_DATA_SUCCESS:
            return fetchInventoryDataSuccess(state, action);
        case actionTypes.FETCH_INVENTORY_DATA_FAIL:
            return fetchInventoryDataFail(state, action);
        case actionTypes.SAVE_INVENTORY_DATA_START:
            return saveInventoryDataStart(state);
        case actionTypes.SAVE_INVENTORY_DATA_SUCCESS:
            return saveInventoryDataSuccess(state, action);
        case actionTypes.SAVE_INVENTORY_DATA_FAIL:
            return saveInventoryDataFail(state, action);
        default:
            return state;
    }
};

export default reducer;