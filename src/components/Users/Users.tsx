import React from 'react'
import style from './Users.module.css'
import User from "./User";
import {UserType} from "../../types/types";
import UsersSearchForm from './UsersSearchForm'
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (page: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users: React.FC<PropsType> = (props) => {
    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    //Карусель массива номеров страниц
    let slicedPages = pages.slice((((props.currentPage - 5) < 0) ? 0 : props.currentPage - 5), (props.currentPage + 5))

    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

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