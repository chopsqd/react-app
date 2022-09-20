import style from './Profile.module.css'

const Profile = () => {
    return <div className={style.profile}>
        <div>
            <img src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg" />
        </div>
        <div>
            ava + desc
        </div>
        <div>
            My posts
            <div>
                New post
            </div>
            <div className={style.posts}>
                <div className={style.item}>
                    post 1
                </div>
                <div className={style.item}>
                    post 2
                </div>
            </div>
        </div>
    </div>
}

export default Profile;