import {usersAPI} from "../api/api";
import {REQUEST_QUANTITY_USERS} from "../constatnts";
import {ThunkAction} from "redux-thunk";
import {AllStateType} from "./store";

const ADD_USERS = 'ADD_USERS'
const IS_FETCHING = 'IS_FETCHING'
const FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE'
const FOLLOW_STATUS_CHANGER = 'FOLLOW_STATUS_CHANGER'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

type ActionsTypes = AddUsersType
    | IsFetchingT
    | FetchNextPageT
    | FollowStatusChangerT
    | ToggleFollowingProgressT

type ThunksType = ThunkAction<Promise<void>, AllStateType, any, ActionsTypes>

export type UsersRT = typeof usersStateR

const usersStateR = {
    users: [] as UserT[],
    fetching: true as boolean,
    page: 1 as number,
    followingInProgress: [] as number[]
}

const allUsersR = (state = usersStateR, action: ActionsTypes) => {
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
                users: state.users.map((us) => {
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
export type Photos = {
    small: string
    large: string
}

export type UserT = {
    id: number
    name: string
    status: string
    photos: Photos
    followed: boolean
}

type AddUsersType = {
    type: typeof ADD_USERS,
    users: UserT[]
}
export const addUsers = (users: UserT[]): AddUsersType => (
    {type: ADD_USERS, users}
)

type IsFetchingT = {
    type: typeof IS_FETCHING
    status: boolean
}
export const isFetching = (status: boolean): IsFetchingT => (
    {type: IS_FETCHING, status}
)

type FetchNextPageT = {
    type: typeof FETCH_NEXT_PAGE
    pageNum: number
}
export const fetchNextPage = (pageNum: number): FetchNextPageT => (
    {type: FETCH_NEXT_PAGE, pageNum}
)

type FollowStatusChangerT = {
    type: typeof FOLLOW_STATUS_CHANGER
    userId: number
}
export const followStatusChanger = (userId: number): FollowStatusChangerT => (
    {type: FOLLOW_STATUS_CHANGER, userId}
)

type ToggleFollowingProgressT = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressT => (
    {type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId}
)

export const getUsers = (fetching: boolean, page: number)
    : ThunksType => async (dispatch) => {
    if (fetching) {
        usersAPI.getUsers(page).then((data) => {
            if (Math.ceil(data.totalCount / REQUEST_QUANTITY_USERS) >= page) {
                dispatch(fetchNextPage(page + 1))
                dispatch(addUsers(data.items))
            }
            dispatch(isFetching(false))
        })
    }
}

export const followUnfollow = (userId: number, userFollowed: boolean)
    : ThunksType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.userFollower(userFollowed, userId).then((resultCode) => {
        if (resultCode === 0) {
            dispatch(followStatusChanger(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}

export default allUsersR