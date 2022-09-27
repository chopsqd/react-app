import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img
                    src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg"/>
            </div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <div>{props.profile.fullName}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;