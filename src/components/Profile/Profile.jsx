import style from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts
                posts={props.state.posts}
                newPostText={props.state.newPostText}
                updateNewPostText={props.updateNewPostText}
                addPost={props.addPost}/>
        </div>
    )
}

export default Profile;