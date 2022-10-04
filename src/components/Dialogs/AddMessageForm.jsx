import {Field, reduxForm} from "redux-form";
import {FormElement} from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../../utils/validators";

const Textarea = FormElement("textarea")
const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} validate={[required, maxLengthCreator(50)]} name="newMessageBody" placeholder="Enter your message..."/>
        <button>Добавить</button>
    </form>
}

export default reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)
