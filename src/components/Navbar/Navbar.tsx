import style from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className={style.nav}>
            <div>
                <NavLink to='/profile' className = { navData => navData.isActive ? style.active : style.item }>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className = { navData => navData.isActive ? style.active : style.item }>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/users' className = { navData => navData.isActive ? style.active : style.item }>Users</NavLink>
            </div>
            <div>
                <NavLink to='/chat' className = { navData => navData.isActive ? style.active : style.item }>Chat</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className = { navData => navData.isActive ? style.active : style.item }>Music</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className = { navData => navData.isActive ? style.active : style.item }>Settings</NavLink>
            </div>
        </nav>)
}

export default Navbar;