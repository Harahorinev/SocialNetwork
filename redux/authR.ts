import {authAPI, ResultCodes} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AllStateType} from "./store";

const SET_USERS_DATA = 'SET_USERS_DATA'

const authStateR = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean
}

export type AuthStateT = typeof authStateR
export type AuthActionsT = SetAuthUserDataT
type ThunksType = ThunkAction<Promise<void>, AllStateType, unknown, AuthActionsT>

const authR = (state = authStateR, action: AuthActionsT) => {
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

type SetAuthUserDataT = {
    type: typeof SET_USERS_DATA,
    data: DataType
}

export const setAuthUserData = (email: string, id: number, login: string): SetAuthUserDataT => {
    return {
        type: SET_USERS_DATA,
        data: {
            email,
            id,
            login,
        },
    }
}

export const authMe = (navigation: () => void): ThunksType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.data.email, response.data.data.id, response.data.data.login))
        navigation()
    }
}

export const authResponse = (login: string, password: string, rememberMe: boolean, navigation: () => void)
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

export default authR