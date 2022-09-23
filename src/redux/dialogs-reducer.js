const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export const dialogsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newBody
            return state;
        case SEND_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageBody
            }

            state.messages.push(newMessage)
            state.newMessageBody = ''
            return state;
        default: return state;
    }
}

export default dialogsReducer