import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import allUsersReducer from "./allUsersReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: allUsersReducer,
    auth: authReducer,
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store