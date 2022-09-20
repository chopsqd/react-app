import style from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return <div className={style.profile}>
        <div>
            <img src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg" />
        </div>
        <div>
            ava + desc
        </div>
        <MyPosts />
    </div>
}

export default Profile;