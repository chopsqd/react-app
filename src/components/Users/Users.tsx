import React, {useEffect} from 'react'
import style from './Users.module.css'
import User from "./User";
import UsersSearchForm from './UsersSearchForm'
import {FilterType, follow, requestUsers, setCurrentPage, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {AnyAction} from "redux";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const location = useLocation();

    const useNavigateSearch = () => {
        const navigate = useNavigate();
        return (pathname: any, params: any) =>
            navigate(`${pathname}?${createSearchParams(params)}`);
    };

    const navigateSearch = useNavigateSearch();
    useEffect(() => {
        const query: any = {}

        if(filter.term) query.term = filter.term
        if(filter.friend) query.friend = filter.friend
        if(currentPage !== 1) query.page = String(currentPage)

        navigateSearch("/users", query);

    }, [filter, currentPage]);

    useEffect(() => {
        const query = new URLSearchParams(location.search)

        let actualPage = currentPage;
        let actualFilter = filter;

        const queryFriend: string | null = query.get("friend");
        const queryPage: string | null = query.get("page");
        const queryTerm: string | null = query.get("term");

        if(queryPage) actualPage = Number(queryPage);
        if(queryTerm) actualFilter = { ...actualFilter, term: queryTerm as string};

        switch (queryFriend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false };
                break;
            default:
                break;
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter)as unknown as AnyAction)
    }, [location.search])

    const setCurrentPageNumber = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber)as unknown as AnyAction)
    }

    const onPageChanged = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber)
        dispatch(requestUsers(pageNumber, pageSize, filter)as unknown as AnyAction)
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter)as unknown as AnyAction)
    }

    const followUser = (userId: number) => {
        dispatch(follow(userId)as unknown as AnyAction)
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId)as unknown as AnyAction)
    }

    let pagesCount: number = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    //Карусель массива номеров страниц
    let slicedPages = pages.slice((((currentPage - 5) < 0) ? 0 : currentPage - 5), (currentPage + 5))

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            {slicedPages.map(page => {
                return <button
                    key={page}
                    className={currentPage === page ? style.selectedPage : ""}
                    onClick={(event) => {
                        onPageChanged(page)
                    }}>{page}
                </button>
            })}

            {users.map(user =>
                <User
                    key={user.id}
                    user={user}
                    followingInProgress={followingInProgress}
                    unfollow={unfollowUser}
                    follow={followUser}/>)
            }
        </div>
    )
}
