import logo from '../images/logo.svg';

function Header(props) {

    return (
            <header className="header">
                <a href="index.html" className="header__logo-link">
                    <img src={logo} className="header__logo" alt="лого"/>
                </a>
                <a href={props.linkToAuth} className="header__auth-link">{props.linkTitle}</a>
            </header>
    );
}

export default Header;