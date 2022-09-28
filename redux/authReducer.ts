import {authAPI, ResultCodes} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AllStateType} from "./store";

const SET_USERS_DATA = 'SET_USERS_DATA'

const AUTH_STATE = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean
}

export type AuthStateType = typeof AUTH_STATE
type ActionsType = SetAuthUserDataType
type ThunksType = ThunkAction<Promise<void>, AllStateType, unknown, ActionsType>

const authReducer = (state = AUTH_STATE, action: any) => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}

type DataType = {
    email: string
    id: number
    login: string
}

type SetAuthUserDataType = {
    type: typeof SET_USERS_DATA,
    data: DataType
}

export const setAuthUserData = (email: string, id: number, login: string): SetAuthUserDataType => {
    return {
        type: SET_USERS_DATA,
        data: {
            email,
            id,
            login,
        },
    }
}

export const authMe = (navigation: any): ThunksType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.data.email, response.data.data.id, response.data.data.login))
        navigation()
    }
}

export const authResponse = (login: string, password: string, rememberMe: boolean, navigation: any)
    : ThunksType => async (dispatch) => {
    let response = await authAPI.auth(login, password, rememberMe)
    if (response.data.resultCode === ResultCodes.Success) {
        await dispatch(authMe(navigation))
    } else {
        console.log(response.data.messages[0])
        //    TODO ADD TOASTS
        //    npm install react-native-root-toast
    }
}
//Egorsocialnetwork@gmail.com
//socialnetwork
export default authReducer