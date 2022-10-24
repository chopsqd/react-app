import './App.css';
import React, {Component} from 'react'
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Navigate, Route, Routes, useParams} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {UsersPage} from "./components/Users/UsersPage";
import {LoginPage} from "./components/Login/LoginPage";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer') as any);
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer') as any);
const ChatPage = React.lazy(() => import("./pages/chat/ChatPage") as any);

function withRouter(Children: any) {
    return (props: any) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper' role={'main'}>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-content'>
                    <React.Suspense fallback={<div><Preloader/></div>}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/profile" />} />
                            <Route
                                path='/dialogs/*'
                                element={<DialogsContainer/>}/>
                            <Route path="/profile" element={<ProfileContainer/>}>
                                <Route path=":userId" element={<ProfileContainer/>}/>
                            </Route>
                            <Route
                                path='/users'
                                element={<UsersPage pageTitle={"Users"}/>}/>
                            <Route
                                path='/login'
                                element={<LoginPage/>}/>

                            <Route
                                path='/chat'
                                element={<ChatPage/>}/>
                        </Routes>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialApp;
