import {usersAPI} from "../api/api";
import {REQUEST_QUANTITY_USERS} from "../constatnts";

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

export const getUsers = (fetching: boolean, page: number) => (dispatch: any) => {
    if (fetching) {
        usersAPI.getUsers(page).then((data: any) => {
            if (Math.ceil(data.totalCount / REQUEST_QUANTITY_USERS) >= page) {
                dispatch(fetchNextPage(page + 1))
                dispatch(addUsers(data.items))
            }
            dispatch(isFetching(false))
        })
    }
}

export const followUnfollow = (userId: number, userFollowed: boolean) => (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.userFollower(userFollowed, userId).then((resultCode: any) => {
        if (resultCode === 0) {
            dispatch(followStatusChanger(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}

export default allUsersReducer