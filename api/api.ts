import axios from "axios";
import {REQUEST_QUANTITY_USERS} from "../constatnts";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f663c575-7944-474b-8d8c-64b77d9ea1e6'
    }
})


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
export const authAPI = {
    me() {
        return (
            instance.get(`auth/me`)
        )
    },

    auth(email: string, password: string, rememberMe: boolean) {
        return (
            instance.post(`auth/login`, {
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
            instance.get(`profile/${id}`)
                .then(response => {
                    if (response) {
                        return response.data
                    }
                })
        )
    },
}