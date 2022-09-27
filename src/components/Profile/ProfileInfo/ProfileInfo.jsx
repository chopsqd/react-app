import style from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img
                    src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg"/>
            </div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + desc
            </div>
        </div>
    )
}

export default ProfileInfo;