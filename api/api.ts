import axios from "axios";
import {REQUEST_QUANTITY_USERS} from "../constatnts";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f663c575-7944-474b-8d8c-64b77d9ea1e6'
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaRequired = 10
}

export const usersAPI = {
    getUsers(page: number) {
        return (
            instance.get(`users?count=${REQUEST_QUANTITY_USERS}&page=${page}`)
                .then(response => response.data)
        )
    },
    userFollower(follow: boolean, userId: number) {
        return (
            !follow
                ? instance.post(`follow/${userId}`, {}).then((response: any) => {
                    return (
                        response.data.resultCode
                    )
                })
                : instance.delete(`follow/${userId}`).then((response: any) => {
                    return (
                        response.data.resultCode
                    )
                })
        )
    },
}

type MeR = {
    data: {
        email: string
        id: number
        login: string
    }
    resultCode: ResultCodes
    messages: string[]
}


type AuthLoginR = {
    data: {
        userId: number
    }
    resultCode: ResultCodes
    messages: string[]
}

type ProfileR = {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    },
    fullName: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    photos: { "large": any, "small": any }
    userId: number | null
}

export const authAPI = {
    me() {
        return (
            instance.get<MeR>(`auth/me`)
        )
    },

    auth(email: string, password: string, rememberMe: boolean) {
        return (
            instance.post<AuthLoginR>(`auth/login`, {
                email: email,
                password: password,
                rememberMe: rememberMe
            })
        )
    },
}

export const profileAPI = {
    getProfile(id: number) {
        return (
            instance.get<ProfileR>(`profile/${id}`)
                .then((response) => {
                    if (response) {
                        return response.data
                    }
                })
        )
    },
}