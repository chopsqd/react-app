import style from './ProfileInfo.module.css'
import React, {useEffect, useState} from 'react'

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateProfileStatus(status)
    }

    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    }

    return (
        <div>
            {
                !editMode
                    ? <div><span onDoubleClick={activateEditMode}>{props.status || "No status yet"}</span></div>
                    : <div><input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}/></div>
            }
        </div>
    )
}

export default ProfileStatus;