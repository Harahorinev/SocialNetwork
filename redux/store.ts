import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import userPostsR from "./userPostsR";
import dialogsR from "./dialogsR";
import allUsersR from "./allUsersR";
import authR from "./authR";
import thunk, {ThunkAction} from "redux-thunk"

let reducers = combineReducers({
    profilePage: userPostsR,
    dialogsPage: dialogsR,
    usersPage: allUsersR,
    auth: authR,
})

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never

export type DefaultThunksT<A extends Action, R = Promise<void>> = ThunkAction<R, AllStateType, unknown, A>

export type AllStateType = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunk))

export default store
