import axios from "axios";
import {PhotosType, ProfileType, UserType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "26328fed-ebe1-4892-98e8-4d4b0913adc0"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

// Generic type
type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

// Type for ResponseType
type AuthMeResponseDataType = {
    id: number
    email: string
    login: string
}

// Type for ResponseType
type LoginResponseDataType = {
    userId: number
}

// Type for getUsers()
type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

// Type for savePhoto()
type SavePhotoResponseDataType = {
    photos: PhotosType
}

// Type for getCaptchaUrl()
type GetCaptchaUrlResponseType ={
    url: string
}

export const API = {
    // Users
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },

    // Login
    authMe() {
        return instance.get<ResponseType<AuthMeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },

    // Profile
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateProfileStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)

        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile`, profile).then(res => res.data)
    },
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}