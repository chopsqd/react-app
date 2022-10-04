import style from './Users.module.css'
import userPhoto from '../../assets/images/userPhoto.png'
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, unfollow, follow}) => {
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