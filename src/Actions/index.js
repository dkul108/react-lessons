import * as types from '../Constants'
export function filterDetails(value) {
    return {
        type: types.FILTER_DETAILS,
        value
    }
}
export function filterGrid(value) {
    return {
        type: types.FILTER,
        value
    }
}
export function toggleActive(value) {
    return {
        type: types.TOGGLE_ACTIVE,
        value
    }
}

export function startLoading() {
    return {
        type: types.START_LOADING
    }
}
export function stopLoading() {
    return {
        type: types.STOP_LOADING
    }
}

export function addData(value) {
    return {
        type: types.ADD_DATA,
        value
    }
}

export function loadDataInGrid(){
    return (dispatch) => {
        dispatch(startLoading());
        fetch('http://localhost:4730')
            .then(function(response) {
                return response.json();
            }).then(function(json) {
            dispatch(addData(json.gridRecords))
        }).then(function(){
            dispatch(stopLoading());
        })
    }
}