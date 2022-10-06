import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from '../../../assets/images/userPhoto.png'

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader />
    }

    const onProfilePhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.headerImageWrapper}>
                <img
                    src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg"/>
            </div>
            <div>
                <img src={props.profile.photos.large || userPhoto}/>
                { props.isOwner ? <input type={"file"} onChange={onProfilePhotoSelected}/> : null}
                <div>{props.profile.fullName}</div>
                <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;