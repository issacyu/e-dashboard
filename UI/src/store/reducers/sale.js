import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    saleData: [],
    loading: false,
    error: ''
};

const fetchSaleDataStart = (state) => {
    return updateObject(state, {loading: true});
}

const fetchSaleDataSuccess = (state, action) => {
    return updateObject(state, {
        saleData: action.saleData,
        loading: false,
        error: ''
    })
}

const fetchSaleDataFail = (state, action) => {
    return updateObject(state, {
        loading: false, 
        error: action.error
    })
}

const saveSaleDataStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: ''
    });
}

const saveSaleDataSuccess = (state, action) => {
    return updateObject(state, {
        saleData: action.saleData,
        loading: false,
        error: ''
    })
}

const saveSaleDataFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SALE_DATA_START:
            return fetchSaleDataStart(state);
        case actionTypes.FETCH_SALE_DATA_SUCCESS:
            return fetchSaleDataSuccess(state, action);
        case actionTypes.FETCH_SALE_DATA_FAIL:
            return fetchSaleDataFail(state, action);
        case actionTypes.SAVE_SALE_DATA_START:
            return saveSaleDataStart(state);
        case actionTypes.SAVE_SALE_DATA_SUCCESS:
            return saveSaleDataSuccess(state, action);
        case actionTypes.SAVE_SALE_DATA_FAIL:
            return saveSaleDataFail(state, action);
        default:
            return state;
    }
};

export default reducer;