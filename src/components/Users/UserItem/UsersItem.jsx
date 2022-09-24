import style from './UsersItem.module.css'

const UsersItem = (props) => {
    return <div className={style.usersItem}>
        <div>
            <div>
                <img src={props.user.photoUrl}/>
                {props.user.followed
                    ? <button onClick={() => {props.unfollow(props.user.id)}}>Unfollow</button>
                    : <button onClick={() => {props.follow(props.user.id)}}>Follow</button>}
            </div>
        </div>

        <div className={style.userInfo}>
            <div>{props.user.fullName}</div>
            <div>{props.user.status}</div>
            <div>{props.user.location.country}</div>
            <div>{props.user.location.city}</div>
        </div>
    </div>
}

export default UsersItem;
