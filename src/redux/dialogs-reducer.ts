import {InferActionsTypes} from "./redux-store";

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
type ActionsType = InferActionsTypes<typeof actions>

export const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {id: 88, message: action.newMessageBody}]
            }
        default: return state;
    }
}

export const actions = {
    sendMessageActionCreator: (newMessageBody: string) => ({ type: 'SEND-MESSAGE', newMessageBody } as const)
}

export default dialogsReducer