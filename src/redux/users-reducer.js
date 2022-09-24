const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

let initialState = {
    users: [
        // {id: 1, followed: false, fullName: 'Dmitry', status: 'Im boss', location: {city: 'Minsk', country: 'Belarus'}},
        // {id: 2, followed: true, fullName: 'Alex', status: 'ebal ya vas v rot', location: {city: 'Moskow', country: 'Russia'}},
        // {id: 3, followed: false, fullName: 'Misha', status: 'Senior WebDev', location: {city: 'Donetsk', country: 'Russia'}},
    ]
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId) {
                        //возвращаем копию, но followed=true
                        return {...user, followed: true}
                    }
                    //просто возвращаем копию
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default: return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId })
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({type: SET_USERS, users })

export default profileReducer