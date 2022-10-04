import {API} from "../api/api";

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post 83.9', likesCount: 11},
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setProfileStatus = (status) => ({type: SET_PROFILE_STATUS, status})

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await API.getProfile(userId);
    dispatch(setUserProfile(response.data))
}

export const getProfileStatus = (userId) => async (dispatch) => {
    let response = await API.getProfileStatus(userId);
    dispatch(setProfileStatus(response.data))
}

export const updateProfileStatus = (status) => async (dispatch) => {
    let response = await API.updateProfileStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(status))
    }
}


export default profileReducer