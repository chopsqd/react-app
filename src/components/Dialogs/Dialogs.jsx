import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import AddMessageForm from "./AddMessageForm";

const Dialogs = (props) => {
    let state = props.dialogsPage
    let dialogElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={style.dialogPage}>
            <div className={style.dialogsItems}>
                <div>{dialogElements}</div>
            </div>

            <div className={style.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>)
}

export default Dialogs