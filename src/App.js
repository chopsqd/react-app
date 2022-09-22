import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-content'>
                    <Routes>
                        <Route
                            path='/dialogs/*'
                            element={<Dialogs
                                state={props.state.dialogsPage}/>}/>
                        <Route
                            path='/profile'
                            element={<Profile
                                state={props.state.profilePage}
                                addPost={props.addPost}
                                updateNewPostText={props.updateNewPostText}/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
