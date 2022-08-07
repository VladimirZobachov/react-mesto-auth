import React from "react";
import {useState} from "react";

function Login({onLogin}){
    const [loginData, setLoginData] = useState(
        {
            email: '',
            password: ''
        }
    )

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!loginData.email || !loginData.password){
            return;
        }
        onLogin(loginData.email, loginData.password)
            .catch(err => setMessage(err.message || 'Что-то пошло не так!'));
    }

return (
    <div onSubmit={handleSubmit} className="login">
        <p className="login__title">Вход</p>
        <p className="login__error">{message}</p>
        <form className="login__form">
            <input className="login__form-input" id="email" required name="email" autoComplete="email" value={loginData.email} onChange={handleChange} type="email" placeholder="Email"/>
            <input className="login__form-input" id="password" required name="password" autoComplete="password" value={loginData.password} onChange={handleChange} type="password" placeholder="Пароль"/>
            <div className="login__button-container">
                <button type="submit" className="login__link">Войти</button>
            </div>
        </form>
    </div>
);
}

export default Login;