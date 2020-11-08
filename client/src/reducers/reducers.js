import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

// groups all the reducers together and only passes them the state that they care about
//function moviesApp(state = {}, action) {
//    return {
//        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//        movies: movies(state.movies, action)
//    }
//}

const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;