import style from './Users.module.css'
import userPhoto from '../../assets/images/userPhoto.png'
import {NavLink} from "react-router-dom";
import * as axios from "axios";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }



    //Карусель массива номеров страниц
    let slicedPages = pages.slice((((props.currentPage - 5) < 0) ? 0 : props.currentPage - 5), (props.currentPage + 5))
    return (
        <div>
            {slicedPages.map(page => {
                return <button
                    key={page}
                    className={props.currentPage === page ? style.selectedPage : ""}
                    onClick={(event) => {
                        props.onPageChanged(page)
                    }}>{page}
                </button>
            })}

            {props.users.map(user =>
                <div className={style.usersItem} key={user.id}>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            <img src={user.photos.small ?? userPhoto}/>
                        </NavLink>
                        {user.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "26328fed-ebe1-4892-98e8-4d4b0913adc0"
                                    }
                                }).then(response => {
                                    if (response.data.resultCode === 0) {
                                        props.unfollow(user.id)
                                    }
                                })
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "26328fed-ebe1-4892-98e8-4d4b0913adc0"
                                    }
                                }).then(response => {
                                    if (response.data.resultCode === 0) {
                                        props.follow(user.id)
                                    }
                                })
                            }}>Follow</button>}
                    </div>

                    <div className={style.userInfo}>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users;