const ADD_USERS = 'ADD_USERS'
const IS_FETCHING = 'IS_FETCHING'
const FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE'
const FOLLOW_STATUS_CHANGER = 'FOLLOW_STATUS_CHANGER'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

const allUsersReducer = (state: any = {users: [], fetching: true, page: 1, followingInProgress: []}, action: any) => {
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
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: number) => id !== action.userId)
            }
        default:
            return state
    }
}

export const addUsers = (users: any) => (
    {type: ADD_USERS, users}
)

export const isFetching = (status: any) => (
    {type: IS_FETCHING, status}
)

export const fetchNextPage = (pageNum: number) => (
    {type: FETCH_NEXT_PAGE, pageNum}
)

export const followStatusChanger = (userId: number) => (
    {type: FOLLOW_STATUS_CHANGER, userId}
)

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => (
    {type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId}
)

export default allUsersReducer