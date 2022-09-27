import {authAPI} from "../api/api";

const SET_USERS_DATA = 'SET_USERS_DATA'

const AUTH_STATE = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean
}

export type AuthStateType = typeof AUTH_STATE

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

type SetAuthUsersDataType = {
    type: typeof SET_USERS_DATA,
    data: DataType
}
export const setAuthUsersData = (email: string, id: number, login: string): SetAuthUsersDataType => {
    return {
        type: SET_USERS_DATA,
        data: {
            email,
            id,
            login,
        },
    }
}

export const authMe = (navigation: any) => (dispatch: any) => {
    authAPI.me().then((response: any) => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUsersData(response.data.data.email, response.data.data.id, response.data.data.login))
            navigation()
        }
    })
}

export const authResponse = (login: string, password: string, rememberMe: boolean, navigation: any) => (dispatch: any) => {
    authAPI.auth(login, password, rememberMe).then((response: any) => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUsersData(response.data.data.email, response.data.data.id, response.data.data.login))
            navigation()
        } else {
            console.log(response.data.messages[0])
            //    TODO ADD TOASTS
            //    npm install react-native-root-toast
        }
    })
}

export default authReducer