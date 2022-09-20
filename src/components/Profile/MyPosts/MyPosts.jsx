import style from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = () => {
    return <div>
        My posts
        <div>
            <textarea></textarea>
            <button>Add post</button>
        </div>
        <div className={style.posts}>
            <Post message='Hi, how are you?' likesCount='23'/>
            <Post message='Its my first post' likesCount='0'/>
        </div>
    </div>
}

export default MyPosts;