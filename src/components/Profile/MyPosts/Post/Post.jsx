import style from './Post.module.css'

const Post = () => {
    return <div className={style.item}>
        <img src="https://cs6.pikabu.ru/avatars/404/x404070-828004264.png" alt="Avatar" />
        post 1
        <div>
            <span>like</span>
        </div>
    </div>
}

export default Post;