import * as actionTypes from '../actions/actionTypes';

const initialState = {
    overviewData: [],
    loading: false
};

const fetchOverviewDataStart = (state) => {
    return {
        ...state,
        loading: true
    };
}

const fetchOverviewDataSuccess = (state, action) => {
    return {
        loading: false
    }
}

const fetchOverviewDataFail = (state, action) => {
    
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_OVERVIEW_DATA_START:
            return fetchOverviewDataStart(state);
        case actionTypes.FETCH_OVERVIEW_DATA_SUCCESS:
            return fetchOverviewDataSuccess(state, action);
        case actionTypes.FETCH_OVERVIEW_DATA_FAIL:
            return fetchOverviewDataFail(state, action);
        default:
            return state;
    }
};

export default reducer;