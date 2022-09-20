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
    return (
        <div className={style.dialogPage}>
            <div className={style.dialogsItems}>
                <DialogItem name="Dima" id="1"/>
                <DialogItem name="Andrew" id="2"/>
                <DialogItem name="Sveta" id="3"/>
                <DialogItem name="Sasha" id="4"/>
                <DialogItem name="Viktor" id="5"/>
                <DialogItem name="Valera" id="6"/>
            </div>

            <div className={style.messages}>
                <Message message={"Hi!"}/>
                <Message message={"Hello"}/>
                <Message message={"How are you?"}/>
                <Message message={"Good!"}/>
            </div>
        </div>)
}

export default Dialogs