import {API} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostType, PhotosType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post 83.9', likesCount: 11},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_PROFILE_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setProfileStatus: (status: string) => ({type: SET_PROFILE_STATUS, status} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await API.getProfile(userId);
    dispatch(actions.setUserProfile(data))
}

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await API.getProfileStatus(userId);
    dispatch(actions.setProfileStatus(data))
}

export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await API.updateProfileStatus(status);

    if (data.resultCode === 0) {
        dispatch(actions.setProfileStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await API.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await API.saveProfile(profile);

    if (data.resultCode === 0) {
        if(userId != null) {
            await dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}


export default profileReducer