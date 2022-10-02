import style from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {FormElement} from "../common/FormsControls/formsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const Input = FormElement("input")
const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Email"} name={"email"} component={Input} validate={[required]}/>
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} component={Input} type={"password"} validate={[required]}/>
        </div>
        <div>
            <Field component={"input"} name={"rememberMe"} type={"checkbox"}/>Remember me
        </div>
        {
            props.error
            ? <div className={style.summaryError}>{props.error}</div>
            : null
        }
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    console.log(props)
    if(props.isAuth) {
        return <Navigate to="/profile" />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login)