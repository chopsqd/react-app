import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id

    return (
        <div className={style.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {
    let dialogs = [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ]
    let messages = [
        {id: 1, message: 'Hey!'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Wsup bruh'},
        {id: 4, message: 'Nice. You?'},
        {id: 5, message: 'Good man'},
        {id: 6, message: 'Ok, gn'},
    ]

    let dialogElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements= messages.map(m => <Message message={m.message}/>)

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