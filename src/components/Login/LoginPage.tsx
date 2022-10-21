import style from './Login.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormElement} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import React from "react";
import {AnyAction} from "redux";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const Input = FormElement("input")
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder={"Email"} name={"email"} component={Input} validate={[required]}/>
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} component={Input} type={"password"} validate={[required]}/>
        </div>
        <div>
            <Field component={"input"} name={"rememberMe"} type={"checkbox"}/>Remember me
        </div>

        { captchaUrl && <img src={captchaUrl}/>}
        { captchaUrl && <Field name={"captcha"} component={Input} validate={[required]}/>}

        {
            error
            ? <div className={style.summaryError}>{error}</div>
            : null
        }
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: any
}

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha)as unknown as AnyAction)
    }

    if(isAuth) {
        return <Navigate to="/profile" />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}