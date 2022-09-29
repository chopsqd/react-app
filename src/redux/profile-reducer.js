import {API} from "../api/api";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post 83.9', likesCount: 11},
    ],
    newPostText: '',
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
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
        default: return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST })
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) =>
    ({ type: SET_USER_PROFILE, profile })
export const setProfileStatus = (status) =>
    ({ type: SET_PROFILE_STATUS, status })

export const getUserProfile = (userId) => (dispatch) => {
    API.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const getProfileStatus = (userId) => (dispatch) => {
    API.getProfileStatus(userId).then(response => {
        dispatch(setProfileStatus(response.data))
    })
}

export const updateProfileStatus = (status) => (dispatch) => {
    API.updateProfileStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setProfileStatus(status))
        }
    })
}


export default profileReducer