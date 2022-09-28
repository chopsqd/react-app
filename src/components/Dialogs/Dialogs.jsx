import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Navigate} from "react-router-dom";

const Dialogs = (props) => {
    let state = props.dialogsPage
    let dialogElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements= state.messages.map(m => <Message message={m.message} key={m.id}/>)
    let newMessageBody = state.newMessageBody

    let onNewMessageChange = (event) => {
        let body = event.target.value
        props.updateNewMessageBody(body)
    }

    let onSendMessageClick = () => {
        props.sendMessage()
    }

    if(!props.isAuth) return <Navigate to="/login"/>
    return (
        <div className={style.dialogPage}>
            <div className={style.dialogsItems}>
                <div>{dialogElements}</div>
            </div>

            <div className={style.messages}>
                <div>{messagesElements}</div>

                <div>
                    <textarea
                        placeholder={"Enter your message..."}
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                    ></textarea>
                    <button onClick={ onSendMessageClick }>Добавить</button>
                </div>
            </div>
        </div>)
}

export default Dialogs