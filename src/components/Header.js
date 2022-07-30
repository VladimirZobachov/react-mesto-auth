import logo from '../images/logo.svg';

function Header() {
    return (
            <header className="header">
                <a href="index.html" className="header__logo-link">
                    <img src={logo} className="header__logo" alt="лого"/>
                </a>
            </header>
    );
}

export default Header;