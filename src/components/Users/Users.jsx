import style from './Users.module.css'
import User from "./User";

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
                <User
                    className={style.usersItem}
                    key={user.id}
                    user={user}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}/>)
            }
        </div>
    )
}

export default Users;