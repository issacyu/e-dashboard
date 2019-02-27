import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    inventoryData: [],
    loading: false
};

const fetchInventoryDataStart = (state) => {
    return updateObject(state, {loading: true});
}

const fetchInventoryDataSuccess = (state, action) => {
    return updateObject(state, {
        inventoryData: action.inventoryData,
        loading: false
    })
}

const fetchInventoryDataFail = (state) => {
    return updateObject(state, {loading: false})
}

const saveInventoryDataStart = (state) => {
    return updateObject(state, {loading: true});
}

const saveInventoryDataSuccess = (state, action) => {
    return updateObject(state, {
        inventoryData: action.inventoryData,
        loading: false
    })
}

const saveInventoryDataFail = (state) => {
    return updateObject(state, {loading: false})
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