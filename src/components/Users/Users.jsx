import React from "react";
import style from './Users.module.css'
import UsersItem from "./UserItem/UsersItem";
import * as axios from "axios";

class Users extends React.Component {
    constructor(props) {
        super(props)

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return this.props.users.map(user => <UsersItem key={user.id} user={user} follow={this.props.follow} unfollow={this.props.unfollow}/>)
    }
}

export default Users