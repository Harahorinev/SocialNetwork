import {combineReducers, createStore} from "redux";

let reducers = combineReducers()

let store = createStore(reducers)

// action

const addPost = (state = { value: 0 }, action: any) =>  {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        default:
            return state
    }
}

export default store