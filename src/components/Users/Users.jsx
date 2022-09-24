import style from './Users.module.css'
import UsersItem from "./UserItem/UsersItem";

const Users = (props) => {
    if(props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://i.pinimg.com/236x/59/c7/99/59c799e239940de4d573915d4abd47c4.jpg',
                followed: false, fullName: 'Dmitry', status: 'Im boss', location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'https://i.pinimg.com/236x/59/c7/99/59c799e239940de4d573915d4abd47c4.jpg',
                followed: true, fullName: 'Alex', status: 'ebal ya vas v rot', location: {city: 'Moskow', country: 'Russia'}
            },
            {
                id: 3,
                photoUrl: 'https://i.pinimg.com/236x/59/c7/99/59c799e239940de4d573915d4abd47c4.jpg',
                followed: false, fullName: 'Misha', status: 'Senior WebDev', location: {city: 'Donetsk', country: 'Russia'}
            },
        ])
    }

    return props.users.map(user => <UsersItem key={user.id} user={user} follow={props.follow} unfollow={props.unfollow}/>)
}

export default Users