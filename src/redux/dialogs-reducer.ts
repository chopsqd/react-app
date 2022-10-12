const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hey!'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Wsup bruh'},
        {id: 4, message: 'Nice. You?'},
        {id: 5, message: 'Good man'},
        {id: 6, message: 'Ok, gn'},
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 88, message: action.newMessageBody}]
            }
        default: return state;
    }
}

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageActionCreator = (newMessageBody: string): SendMessageActionCreatorType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer