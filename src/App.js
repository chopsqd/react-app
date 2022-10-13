import './App.css';
import React, {Component} from 'react'
import Navbar from './components/Navbar/Navbar';
import {Routes, Route, useParams, BrowserRouter, Navigate} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));

function withRouter(Children) {
    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class App extends Component {
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
                                element={<UsersContainer pageTitle={"Users"}/>}/>
                            <Route
                                path='/login'
                                element={<Login/>}/>
                        </Routes>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialApp;
