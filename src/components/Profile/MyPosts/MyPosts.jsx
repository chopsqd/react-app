import style from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={style.posts}>
                <Post message='Hi, how are you?' likesCount='23'/>
                <Post message='Its my first post' likesCount='0'/>
            </div>
        </div>
    )
}

export default MyPosts;