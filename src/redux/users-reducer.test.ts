import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: "Misha",
                followed: false,
                photos: {small: null, large: null},
                status: "Status 0"
            },
            {
                id: 1,
                name: "Misha 1",
                followed: false,
                photos: {small: null, large: null},
                status: "Status 1"
            },
            {
                id: 2,
                name: "Misha 2",
                followed: true,
                photos: {small: null, large: null},
                status: "Status 2"
            },
            {
                id: 3,
                name: "Misha 3",
                followed: true,
                photos: {small: null, large: null},
                status: "Status 3"
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test("Follow success", () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("Unfollow success", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})