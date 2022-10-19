import style from './Users.module.css'
import userPhoto from '../../assets/images/userPhoto.png'
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
import React from "react";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div className={style.usersItem}>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small ?? userPhoto}/>
                </NavLink>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id)
                    }}>Follow</button>}
            </div>

            <div className={style.userInfo}>
                <div>{user.name}</div>
                <div>{user.status}</div>
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
            </div>
        </div>
    )
}

export default User;