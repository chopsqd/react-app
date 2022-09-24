const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
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

export const dialogsReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        messages: [...state.messages]
    }

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            stateCopy.newMessageBody = action.newBody
            return stateCopy;
        }
        case SEND_MESSAGE: {
            let newMessage = {
                id: 6,
                message: state.newMessageBody
            }

            stateCopy.messages.push(newMessage)
            stateCopy.newMessageBody = ''
            return stateCopy;
        }
        default: return state;
    }
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyActionCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, newBody: body })

export default dialogsReducer