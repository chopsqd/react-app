import React from "react";
import style from './Users.module.css'
import UsersItem from "./UserItem/UsersItem";
import * as axios from "axios";

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = [];
        for(let i =1; i <= pagesCount; i++) {
            pages.push(i)
        }

        //Карусель массива номеров страниц
        let slicedPages = pages.slice((((this.props.currentPage - 5) < 0) ?  0  : this.props.currentPage - 5), (this.props.currentPage + 5))

        return (
            <div>
                { slicedPages.map(page => {
                    return <button key={page} className={ this.props.currentPage === page ? style.selectedPage : "" } onClick={(event) => { this.onPageChanged(page)}}>{page}</button>
                }) }

                { this.props.users.map(user => <UsersItem key={user.id} user={user} follow={this.props.follow} unfollow={this.props.unfollow}/>) }
            </div>
        )
    }
}

export default Users