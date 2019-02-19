import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    overviewData: [],
    loading: false
};

const fetchOverviewDataStart = (state) => {
    return updateObject(state, {loading: true});
}

const fetchOverviewDataSuccess = (state, action) => {
    return updateObject(state, {
        overviewData: action.overviewData,
        loading: false
    })
}

const fetchOverviewDataFail = (state) => {
    return updateObject(state, {loading: false})
}

const saveOverviewDataStart = (state) => {
    return updateObject(state, {loading: true});
}

const saveOverviewDataSuccess = (state, action) => {
    return updateObject(state, {
        overviewData: action.overviewData,
        loading: false
    })
}

const saveOverviewDataFail = (state) => {
    return updateObject(state, {loading: false})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_OVERVIEW_DATA_START:
            return fetchOverviewDataStart(state);
        case actionTypes.FETCH_OVERVIEW_DATA_SUCCESS:
            return fetchOverviewDataSuccess(state, action);
        case actionTypes.FETCH_OVERVIEW_DATA_FAIL:
            return fetchOverviewDataFail(state, action);
        case actionTypes.SAVE_OVERVIEW_DATA_START:
            return saveOverviewDataStart(state);
        case actionTypes.SAVE_OVERVIEW_DATA_SUCCESS:
            return saveOverviewDataSuccess(state, action);
        case actionTypes.SAVE_OVERVIEW_DATA_FAIL:
            return saveOverviewDataFail(state, action);
        default:
            return state;
    }
};

export default reducer;