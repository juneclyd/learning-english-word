import { Link } from 'react-router-dom';
import logo from './img/logo.png'
import { useState } from 'react';
import './Login.css'
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        let hasError = false;

        // if (!userName) {
        //     setUserNameError(true);
        //     hasError = true;
        // }
        // if (!email) {
        //     setEmailError(true);
        //     hasError = true;
        // }
        // if (!password) {
        //     setPasswordError(true);
        //     hasError = true;
        // }
        // if (!passwordConf) {
        //     setPasswordConfError(true);
        //     hasError = true;
        // }

        if (hasError) return;

        try {
            const response = await axios.post(
                `https://localhost:8080/word-learner/api/v1/auth/login`,
                {
                    "email": email,
                    "password": password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                }
            );
            localStorage.setItem("registeredUser", JSON.stringify(response.data)); 
            // setSuccessfully("Регистрация прошла успешно");
        } catch (error) {
            // setError("Ошибка регистрации. Пожалуйста, проверьте свои данные.");
            console.error("Error:", error);
        }
    };
    return(
        <div className="login">
            <img src={logo}/>
            <div className="title-login">
                    <h1 className='word-zero'>Вход в</h1>
                    <h1 className='word-one'>СЛОВО</h1>
                    <h1 className='word-two'>ЗНАЙКА</h1>
            </div>
            <div className='form-login'>
                <div className='text-form-login-email'><span className='text-form-login'>Email</span></div>
                <input className='input-text' type="text" placeholder='Введите email' onChange={handleEmailChange}/>
                <div className='text-form-login-email'><span className='text-form-login'>Пароль</span></div>
                <input className='input-text' type="text" placeholder='Введите email' onChange={handlePasswordChange}/>
                <a className='btn-login' onClick={handleSubmit}>Войти</a>
            </div>
            <div className='block-register'>
                <Link to='/register' className='btn-register'>Регистрация</Link>
            </div>
        </div>
    )
}


export default Login;