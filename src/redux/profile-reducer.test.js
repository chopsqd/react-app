import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post 83.9', likesCount: 11},
    ]
}

test('length of posts should be incremented', () => {
    // 1. Test data
    let action = addPostActionCreator("Bruh")

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts.length).toBe(3)
});

test('message of new post should be correct', () => {
    // 1. Test data
    let action = addPostActionCreator("Bruh")

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts[2].message).toBe("Bruh")
});

test('after deleting length of messages should be decrement', () => {
    // 1. Test data
    let action = deletePost(1)

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts.length).toBe(2)
});
