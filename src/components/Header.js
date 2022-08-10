import logo from '../images/logo.svg';
import {Route, Switch} from "react-router-dom";

function Header(props) {
    return (
            <header className="header">
                <a href="index.html" className="header__logo-link">
                    <img src={logo} className="header__logo" alt="лого"/>
                </a>
                <Switch>
                <Route exact path="/login">
                    <a href="/register" className="header__auth-link">Регистрация</a>
                </Route>
                <Route exact path="/register">
                    <a href="/login" className="header__auth-link">Войти</a>
                </Route>
                <Route exact path="/">
                    <div className="header__navbar">
                    <p className="header__auth-link">{props.userInfo.email}</p>
                    <a href="/login" className="header__auth-link" onClick={props.onLogout}>Выйти</a>
                    </div>
                </Route>
                </Switch>
            </header>
    );
}

export default Header;