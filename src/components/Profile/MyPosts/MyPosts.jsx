import style from './MyPosts.module.css'
import Post from './Post/Post';
import React from "react";
import {Field, reduxForm} from "redux-form";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <Field component="textarea" name="newPostText"/>
            <button>Add post</button>
    </form>
}

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;