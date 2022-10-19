import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from '../../../assets/images/userPhoto.png'
import React, {ChangeEvent, useState} from "react";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.headerImageWrapper}>
                <img
                    src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg"/>
            </div>
            <div>
                <img src={props.profile.photos.large || userPhoto}/>
                {props.isOwner ? <input type={"file"} onChange={onProfilePhotoSelected}/> : null}
                <ProfileStatus status={props.status} updateProfileStatus={props.updateProfileStatus}/>

                {editMode
                    ? <ProfileDataFormReduxForm initialValues={props.profile}  profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/>}
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return <div>
        {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}
        <div><b>{props.profile.fullName}</b></div>
        <div>
            <div>Looking for a job: {props.profile.lookingForAJob ? "Yes" : "No"}</div>
            {props.profile.lookingForAJob &&
                <div>My professional skills: {props.profile.lookingForAJobDescription}</div>}
            <div>About me: {props.profile.aboutMe}</div>
        </div>
        <hr/>
        <div>Contacts{
            Object
                .keys(props.profile.contacts)
                .map(key =>
            <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof  ContactsType]}/>)}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo;