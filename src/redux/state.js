import {rerenderEntireTree} from "../render";

let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'Its my first post', likesCount: 11},
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
}

window.state = state

export let addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }

    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export default state