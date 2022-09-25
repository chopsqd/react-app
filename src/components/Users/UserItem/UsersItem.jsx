import style from './UsersItem.module.css'
import userPhoto from '../../../assets/images/userPhoto.png'

const UsersItem = (props) => {
    return <div className={style.usersItem}>
        <div>
            <div>
                <img src={props.user.photos.small ?? userPhoto}/>
                {props.user.followed
                    ? <button onClick={() => {props.unfollow(props.user.id)}}>Unfollow</button>
                    : <button onClick={() => {props.follow(props.user.id)}}>Follow</button>}
            </div>
        </div>

        <div className={style.userInfo}>
            <div>{props.user.name}</div>
            <div>{props.user.status}</div>
            <div>{"props.user.location.country"}</div>
            <div>{"props.user.location.city"}</div>
        </div>
    </div>
}

export default UsersItem;
