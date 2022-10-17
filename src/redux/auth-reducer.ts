import {API, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

export const getAuthUserData = () => async (dispatch: any) => {
    let authMeData = await API.authMe();

    if (authMeData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = authMeData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let loginData = await API.login(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodesEnum.Success) {
        //success, get auth data
        dispatch(getAuthUserData())
    } else {
        if(loginData.resultCode === ResultCodesEnum.CaptchaIsRequired)  {
            dispatch(getCaptchaUrl())
        }

        let message = loginData.messages.length > 0
            ? loginData.messages[0]
            : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await API.getCaptchaUrl();
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
    let response = await API.logout();

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer