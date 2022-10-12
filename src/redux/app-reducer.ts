import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType ={
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS // type = 'INITIALIZED_SUCCESS'
}

export const initializedSuccess = (): InitializedSuccessActionType  => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => async (dispatch: any) => {
    await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}

export default appReducer