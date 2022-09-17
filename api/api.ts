import axios from "axios";
import {REQUEST_QUANTITY_USERS} from "../constatnts";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ef560508-34c6-49ed-a80d-700ff4190d61'
    }
})


export const usersAPI = {
    getUsers (page: number) {
        return (
            instance.get(`users?count=${REQUEST_QUANTITY_USERS}&page=${page}`)
                .then(response => response.data)
        )
    },
}
export const authAPI = {
    me () {
        return (
            instance.get(`auth/me`)
        )
    },

    auth (email: string, password: string, rememberMe: boolean) {
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
    getProfile (id: number) {
        return (
            instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
                .then(response => {
                    if (response) {
                        return response.data
                    }
                })
        )
    },
}