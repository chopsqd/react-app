import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";

const Dialogs = (props) => {
    let state = props.store.getState().dialogsPage

    let dialogElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements= state.messages.map(m => <Message message={m.message}/>)
    let newMessageBody = state.newMessageBody

    let onNewMessageChange = (event) => {
        let body = event.target.value
        props.store.dispatch(updateNewMessageBodyActionCreator(body))
    }

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreator())
    }

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