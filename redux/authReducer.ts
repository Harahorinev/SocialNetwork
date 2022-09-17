const SET_USERS_DATA = 'SET_USERS_DATA '

const INITIAL_STATE = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = INITIAL_STATE, action: any) => {
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

export const setAuthUsersData = (email: string, id: number, login: string) => {
    return {
        type: SET_USERS_DATA,
        data: {
            email,
            id,
            login,
        },
    }
}

export default authReducer