const ADD_USERS = 'ADD_USERS'
const IS_FETCHING = 'IS_FETCHING'
const FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE'
const FOLLOW_STATUS_CHANGER = 'FOLLOW_STATUS_CHANGER'

const allUsersReducer = (state: any = {users: [], fetching: true, page: 1}, action: any) => {
    switch (action.type) {
        case ADD_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        case IS_FETCHING: {
            return {
                ...state,
                fetching: action.status
            }
        }
        case FETCH_NEXT_PAGE: {
            return {
                ...state,
                page: action.pageNum
            }
        }
        case FOLLOW_STATUS_CHANGER: {
            return {
                ...state,
                users: state.users.map((us: any) => {
                    if (us.id === action.userId) {
                        return {
                            ...us,
                            followed: !us.followed
                        }
                    } else {
                        return us
                    }
                })
            }
        }
        default:
            return state
    }
}

export const addUsers = (users: any) => (
    {
        type: ADD_USERS,
        users: users
    }
)

export const isFetching = (fetchingStatus: any) => (
    {
        type: IS_FETCHING,
        status: fetchingStatus
    }
)

export const fetchNextPage = (pageNum: number) => (
    {
        type: FETCH_NEXT_PAGE,
        pageNum: pageNum
    }
)

export const followStatusChanger = (id: number) => (
    {
        type: FOLLOW_STATUS_CHANGER,
        userId: id
    }
)

export default allUsersReducer