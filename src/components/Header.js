import logo from '../images/logo.svg';

function Header(props) {
    return (

            <header className="header">
                <a href="index.html" className="header__logo-link">
                    <img src={logo} className="header__logo" alt="лого"/>
                </a>
                <a href={ `${props.loggedIn ? "/login" : "/register"}`} className="header__auth-link">
                    {`${props.loggedIn ? "Выйти" : "Регистрация"}`}</a>
            </header>
    );
}

export default Header;