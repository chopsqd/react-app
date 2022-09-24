import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";

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
                            element={<DialogsContainer />}/>
                        <Route
                            path='/profile'
                            element={<Profile />}/>
                        <Route
                            path='/users'
                            element={<Users />}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
