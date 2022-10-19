import style from './MyPosts.module.css'
import Post from './Post/Post';
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {FormElement} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../types/types";

const Textarea = FormElement("textarea")

type AddPostFormValuesType = {
    newPostText: string
}

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
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
};

type FormPropsType = {}

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, FormPropsType> & FormPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPostText" validate={[required,maxLengthCreator(30) ]}/>
            <button>Add post</button>
    </form>
}

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, FormPropsType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;