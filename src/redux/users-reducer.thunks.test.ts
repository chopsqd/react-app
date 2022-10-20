import {follow, actions, unfollow} from "./users-reducer";
import {API, ResultCodesEnum, ResponseType} from "../api/api";

jest.mock("../api/api")
const APIMock = API as jest.Mocked<typeof API>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    APIMock.follow.mockClear()
    APIMock.unfollow.mockClear()
})

const result: ResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}

test("Thunk follow works correctly", async () => {
    const thunk = follow(1)

    APIMock.follow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

test("Thunk unfollow works correctly", async () => {
    const thunk = unfollow(1)

    APIMock.unfollow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})