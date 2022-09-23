import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'Its my first post 83.9', likesCount: 11},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dima'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'},
            ],
            messages: [
                {id: 1, message: 'Hey!'},
                {id: 2, message: 'Hello'},
                {id: 3, message: 'Wsup bruh'},
                {id: 4, message: 'Nice. You?'},
                {id: 5, message: 'Good man'},
                {id: 6, message: 'Ok, gn'},
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber() {
        console.log('State has been changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        // pattern "Observer"
        this._callSubscriber = observer
    },

    dispatch(action) { // action = { type: 'ADD-POST' }
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

        this._callSubscriber(this._state)
    }
}

export const addPostActionCreator = () => ({type: ADD_POST })
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyActionCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, newBody: body })

window.state = store
export default store
