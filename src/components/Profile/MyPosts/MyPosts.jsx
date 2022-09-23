import style from './MyPosts.module.css'
import Post from './Post/Post';
import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/state";

const MyPosts = (props) => {
    let state = props.store.getState().profilePage

    let postsElements = state.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
    let newPostElement = React.createRef()

    let addPost = () => {
        //props.addPost()
        props.store.dispatch(addPostActionCreator())
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        //props.updateNewPostText(text)
        //let action = { type: 'UPDATE-NEW-POST-TEXT', newText: text }
        let action = updateNewPostTextActionCreator(text)
        props.store.dispatch(action)
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={ onPostChange }
                        ref={newPostElement}
                        value={state.newPostText}/>
                </div>
                <div>
                    <button onClick={ addPost }>Add post</button>
                </div>
            </div>
            <div className={style.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;