import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return (
        <div className={style.dialogPage}>
            <div className={style.dialogsItems}>
                <div className={style.dialog + ' ' + style.active}>
                    <NavLink to="/dialogs/1">Dima</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to="/dialogs/2">Andrew</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to="/dialogs/3">Sveta</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to="/dialogs/4">Sasha</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to="/dialogs/5">Viktor</NavLink>
                </div>
            </div>
            <div className={style.messages}>
                <div className={style.message}>Hi</div>
                <div className={style.message}>Hello</div>
                <div className={style.message}>How are you?</div>
                <div className={style.message}>Good!</div>
            </div>
        </div>)
}

export default Dialogs