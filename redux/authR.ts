import {authAPI, ResultCodes} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AllStateType, InferActionsTypes} from "./store";

const authStateR = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean
}

const authR = (state = authStateR, action: AuthRAT) => {
    switch (action.type) {
        case 'SET_USERS_DATA': {
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

export const actions = {
    setAuthUserData: (email: string, id: number, login: string) => {
        return {
            type: 'SET_USERS_DATA',
            data: {
                email,
                id,
                login,
            },
        }
    }
}

export const authMe = (navigation: () => void): ThunksT => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(response.data.data.email, response.data.data.id, response.data.data.login))
        navigation()
    }
}

export const authResponse = (login: string, password: string, rememberMe: boolean, navigation: () => void)
    : ThunksT => async (dispatch) => {
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


type AuthRAT = InferActionsTypes<typeof actions>
type ThunksT = ThunkAction<Promise<void>, AllStateType, unknown, AuthRAT>
export type AuthStateT = typeof authStateR
