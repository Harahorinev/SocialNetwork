import {usersAPI} from "../api/api";
import {REQUEST_QUANTITY_USERS} from "../constatnts";
import {DefaultThunksT, InferActionsTypes} from "./store";

export const actions = {
    addUsers: (users: UserT[]) => (
        {type: 'ADD_USERS', users} as const
    ),
    isFetching: (status: boolean) => (
        {type: 'IS_FETCHING', status} as const
    ),
    fetchNextPage: (pageNum: number) => (
        {type: 'FETCH_NEXT_PAGE', pageNum} as const
    ),
    followStatusChanger: (userId: number) => (
        {type: 'FOLLOW_STATUS_CHANGER', userId} as const
    ),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => (
        {type: 'TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const
    ),
}

const usersStateR = {
    users: [] as UserT[],
    fetching: true as boolean,
    page: 1 as number,
    followingInProgress: [] as number[]
}

const allUsersR = (state = usersStateR, action: AllUsersRAT) => {
    switch (action.type) {
        case 'ADD_USERS': {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        case 'IS_FETCHING': {
            return {
                ...state,
                fetching: action.status
            }
        }
        case 'FETCH_NEXT_PAGE': {
            return {
                ...state,
                page: action.pageNum
            }
        }
        case 'FOLLOW_STATUS_CHANGER': {
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
        case 'TOGGLE_FOLLOWING_PROGRESS':
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

export const getUsers = (fetching: boolean, page: number)
    : ThunksT => async (dispatch) => {
    if (fetching) {
        try {
            let data = await usersAPI.getUsers(page)
            if (Math.ceil(data.totalCount / REQUEST_QUANTITY_USERS) >= page) {
                dispatch(actions.fetchNextPage(page + 1))
                dispatch(actions.addUsers(data.items))
            }
            dispatch(actions.isFetching(false))
        } catch (err) {
            console.log(err)
        }
    }
}

export const followUnfollow = (userId: number, userFollowed: boolean)
    : ThunksT => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    try {
        let resultCode = await usersAPI.userFollower(userFollowed, userId)
        if (resultCode === 0) {
            dispatch(actions.followStatusChanger(userId))
        }
        setTimeout(() => {
            dispatch(actions.toggleFollowingProgress(false, userId))
        }, 250)
    //    TODO DELETE TIMEOUT
    } catch (err) {
        console.log(err)
    }
}

export default allUsersR


type AllUsersRAT = InferActionsTypes<typeof actions>
type ThunksT = DefaultThunksT<AllUsersRAT>
export type UsersRT = typeof usersStateR
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
