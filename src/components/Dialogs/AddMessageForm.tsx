import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormElement} from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../../utils/validators";
import {NewMessageFormValuesType} from "./Dialogs";
import React from "react";

const Textarea = FormElement("textarea")
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, {}> & {}> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} validate={[required, maxLengthCreator(50)]} name="newMessageBody" placeholder="Enter your message..."/>
        <button>Добавить</button>
    </form>
}

export default reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm)
