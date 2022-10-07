import {Field, reduxForm} from "redux-form";
import {FormElement} from "../../common/FormsControls/FormsControls";
import style from "../../Login/Login.module.css";

const Input = FormElement("input")
const Textarea = FormElement("textarea")
const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><button>Save</button></div>
        {
            props.error
                ? <div className={style.summaryError}>{props.error}</div>
                : null
        }
        <div><Field placeholder={"Full name"} name={"fullName"} component={Input} validate={[]}/></div>
        <div>
            <div>Looking for a job: <Field name={"lookingForAJob"} component={Input} type={"checkbox"}/></div>
            <div>My professional skills: <Field placeholder={"Describe your skills here..."} name={"lookingForAJobDescription"} component={Textarea}/></div>
            <div>About me: <Field placeholder={"Tell something about yourself..."} name={"aboutMe"} component={Textarea}/></div>
        </div>
        <hr/>
        <div>Contacts{Object.keys(props.profile.contacts).map(key =>
            <div key={key}><b>{key}:</b> <Field placeholder={key} name={`contacts.${key}`} component={Input} /></div>)}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile', enableReinitialize: true, destroyOnUnmount: false})(ProfileDataForm)

export default ProfileDataFormReduxForm