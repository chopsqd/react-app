import style from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={style.header}>
        <img src="https://wallpapersmug.com/download/1280x1024/cdb250/stars-galaxy-nebula-interstellar-milky-way.jpg" />
        <div className={style.loginBlock}>
            { props.isAuth
                ? props.login
                : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;