import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatus-w-hooks";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader />
    }
    return (
        <div className={style.profileInfo}>
            <div className={style.headerImageWrapper}>
                <img
                    src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg"/>
            </div>
            <div>
                <img src={props.profile.photos.large}/>
                <div>{props.profile.fullName}</div>
                <ProfileStatusWithHooks status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;