import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";

const Dialogs = (props) => {
    let dialogElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements= props.state.messages.map(m => <Message message={m.message}/>)

    let newMessageElement = React.createRef()

    let addMessage = () => {
        let text = newMessageElement.current.value
        alert(text)
    }

    return (
        <div className={style.dialogPage}>
            <div className={style.dialogsItems}>
                { dialogElements }
            </div>

            <div className={style.messages}>
                { messagesElements }

                <div>
                    <textarea ref={ newMessageElement }></textarea>
                    <button onClick={ addMessage }>Добавить</button>
                </div>
            </div>
        </div>)
}

export default Dialogs