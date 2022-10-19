import style from './../Dialogs.module.css'
import React from "react";

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}

export default Message