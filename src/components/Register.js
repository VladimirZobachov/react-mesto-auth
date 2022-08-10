import React from "react";
import {useState} from "react";

function Register({onRegister}) {
    const [loginData, setLoginData] = useState(
        {
            email: '',
            password: ''
        }
    )

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            return;
        }
        onRegister(loginData.email, loginData.password);
    }

    return (
        <div className="login">
            <p className="login__title">Регистрация</p>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__form-input" id="email" required name="email" autoComplete="email"
                       value={loginData.email} onChange={handleChange} type="email" placeholder="Email"/>
                <input className="login__form-input" id="password" required name="password" autoComplete="password"
                       value={loginData.password} onChange={handleChange} type="password" placeholder="Пароль"/>
                <div className="login__button-container">
                    <button type="submit" className="login__link">Зарегистрироваться</button>
                    <a href="/signup" className="login__bottom-title">Уже зарегистрированы? Войти</a>
                </div>
            </form>
        </div>
    );
}

export default Register;