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
            ]
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
        if(action.type === 'ADD-POST') {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)

            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    }
}

window.state = store
export default store
