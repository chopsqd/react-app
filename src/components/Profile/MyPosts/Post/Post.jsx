import style from './Post.module.css'

const Post = (props) => {
    return <div className={style.item}>
        <img src="https://cs6.pikabu.ru/avatars/404/x404070-828004264.png" alt="Avatar" />
        { props.message }
        <div>
            <span>like</span> { props.likesCount }
        </div>
    </div>
}

export default Post;