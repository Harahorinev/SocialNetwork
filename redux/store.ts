import {applyMiddleware, combineReducers, createStore} from "redux";
import userPostsR from "./userPostsR";
import dialogsR from "./dialogsR";
import allUsersR from "./allUsersR";
import authR from "./authR";
import thunk from "redux-thunk"

let reducers = combineReducers({
    profilePage: userPostsR,
    dialogsPage: dialogsR,
    usersPage: allUsersR,
    auth: authR,
})

export type AllStateType = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunk))

export default store