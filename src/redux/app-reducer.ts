import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

const initializeApp = () => async (dispatch: any) => {
    await dispatch(getAuthUserData())
    dispatch(actions.initializedSuccess())
}

export default appReducer