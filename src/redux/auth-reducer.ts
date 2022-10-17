import {API, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA',
        payload: {id, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let authMeData = await API.authMe();

    if (authMeData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = authMeData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await API.login(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodesEnum.Success) {
        //success, get auth data
        await dispatch(getAuthUserData())
    } else {
        if(loginData.resultCode === ResultCodesEnum.CaptchaIsRequired)  {
            await dispatch(getCaptchaUrl())
        }

        let message = loginData.messages.length > 0
            ? loginData.messages[0]
            : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await API.getCaptchaUrl();
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await API.logout();

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer