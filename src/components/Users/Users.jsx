import style from './Users.module.css'
import UsersItem from "./UserItem/UsersItem";
import * as axios from "axios";

const Users = (props) => {
    if(props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.setUsers(response.data.items)
            })

    }

    return props.users.map(user => <UsersItem key={user.id} user={user} follow={props.follow} unfollow={props.unfollow}/>)
}

export default Users