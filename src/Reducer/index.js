import {combineReducers} from "redux";
import {TOGGLE_ACTIVE, FILTER, FILTER_DETAILS, START_LOADING, STOP_LOADING, ADD_DATA}
    from '../Constants'





let gridRecords = [
        {firstName: "John", lastName: "Doe", active: false, id: 1},
        {firstName: "Mary", lastName: "Moe", active: false, id: 2},
        {firstName: "Peter", lastName: "Noname", active: true, id: 3}
    ],
    detailsRecords = [{
        id: 1,
        name: "John Doe",
        about: "Nice guy",
        hobby: "Likes drinking wine",
        skills: ["html", "javascript", "redux"]
    }, {
        id: 2,
        name: "Mary Moe",
        about: "Cute girl",
        hobby: "Likes playing xbox whole days long",
        skills: ["Fortran", "Lua", "R#"]
    }];

let gridState = {
    records:[],
    filtered: [],
    loading:false
}

export const rootReducer = combineReducers({
    details,
    grid
});

export function grid(state = gridState, action) {
    switch (action.type) {
        case TOGGLE_ACTIVE:
            let newState = [...state];
            newState[action.value].active = !newState[action.value].active;
            return newState;
        case FILTER:
            let value = action.value;
            let records=state.records;
            if (value.length > 0) {
                records= state.records.filter((record) =>
                    record.lastName.toUpperCase().includes(value.toUpperCase()));
            }
            return {
                ...state,
                records
            };
            //todo - in order not to lost state after search - assing inital state and filtered like here:
            // let filteredOutIds = state.records.filter(
            //     (record) => !record.lastName.toUpperCase().includes(value.toUpperCase()))
            //     .map(record => record.id);
            // return Object.assign({}, state,
            //     {filtered: filteredOutIds});
        case FILTER_DETAILS:

        case START_LOADING:
            return Object.assign({}, state, {loading: true});
        case STOP_LOADING:
            return Object.assign({}, state, {loading: false});
        case ADD_DATA:
            return Object.assign({}, state, {
                records:[...action.value]
            });

        default:
            return state
    }
}

export function details(state = detailsRecords, action) {
    switch (action.type) {
        default:
            return state
    }
}