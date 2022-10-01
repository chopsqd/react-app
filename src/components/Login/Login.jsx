import style from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {FormElement} from "../common/FormsControls/formsControls";
import {required} from "../../utils/validators";

const Input = FormElement("input")
const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Login"} name={"login"} component={Input} validate={[required]}/>
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]}/>
        </div>
        <div>
            <Field component={"input"} name={"rememberMe"} type={"checkbox"}/>Remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login