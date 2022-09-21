import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let dialogElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements= props.state.messages.map(m => <Message message={m.message}/>)

    return (
        <div className={style.dialogPage}>
            <div className={style.dialogsItems}>
                { dialogElements }
            </div>

            <div className={style.messages}>
                { messagesElements }
            </div>
        </div>)
}

export default Dialogs