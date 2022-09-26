import style from './Users.module.css'
import userPhoto from '../../assets/images/userPhoto.png'

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
                    onClick={(event) => { props.onPageChanged(page)}}>{page}
                </button>
            })}

            {props.users.map(user =>
                <div className={style.usersItem} key={user.id}>
                    <div>
                        <img src={user.photos.small ?? userPhoto}/>
                        { user.followed
                        ? <button onClick={() => { props.unfollow(user.id)}}>Unfollow</button>
                        : <button onClick={() => { props.follow(user.id)}}>Follow</button>}
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