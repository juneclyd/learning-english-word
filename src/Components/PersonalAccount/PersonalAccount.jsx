import React, { useEffect, useState } from 'react';
import Burger from './img/🦆 icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import UserImg from './img/user.png';
import Calendar from './img/Calendar.png';
import './PersonalAccount.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PersonalAccount = () => {
    const study = ['активный ученик', 'упорный ученик', 'пробивной ученик', 'создатель модулей', 'мастер карточек', 'мастер подборов', 'мастер тестов'];
    const chain = ['3 дня', '5 дней', '10 дней', '15 дней', '40 дней', '100 дней', '300 дней'];
    const module = ['1 модуль', '3 модуля', '10 модулей', '15 модулей', '40 модулей', '100 модулей', '300 модулей'];
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const [userNamePlaceholder, setUserNamePlaceholder] = useState('');
    const [emailPlaceholder, setEmailPlaceholder] = useState('');
    const [stateBurger, setStateBurger] = useState(false)

    const [data, setData] = useState(null);
    const userRole = JSON.parse(localStorage.getItem('dataUser'))?.role;
    const userToken = JSON.parse(localStorage.getItem('dataUser'))?.token;

    const saveInfoUser = (event) => {
        setUserName('');
        setEmail('');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailPlaceholder(e.target.value)
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        setUserNamePlaceholder(e.target.value);
    };

    useEffect(() => {
        if (userToken) {
            axios.get('http://localhost:8080/word-learner/api/v1/profile', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })
            .then(response => {
                setData(response.data);
                setUserNamePlaceholder(response.data.username);
                setEmailPlaceholder(response.data.email);
                console.log(response.data); 
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
        }
    }, [userToken]); 

    const checkStudy = (achievementName) => {
        if (data && data.achievements) {
            console.log(data.achievements.some((el) => el.name === achievementName))
            return data.achievements.some((el) => el.name === achievementName);
        }
        return false;
    };
    const handleStateBurger = () => {
        if(stateBurger === false) {
            setStateBurger(true)
        } else {
            setStateBurger(false)
        }
    }

    if (!data) {
        return <div>Загрузка...</div>; 
    }

    return (
        <div className="personal-account">
            <header className="header-left">
                <div className="header-left-icon">
                    <img src={Burger} onClick={handleStateBurger} className='burger' alt="burger menu" />
                    <img src={Logo} className='header-left-logo' alt="logo" />
                </div>
                <div className='header-left-container-buttons'  style={!stateBurger ? {display: 'inline-flex'} : {display: 'none'} }>
                    <Link to={`/createdModeles/${userRole}`} className='header-left-button'>
                        <img src={DoneModuleImg} className='header-left-buttons-img' alt="done modules" />
                        <span className='header-left-buttons-text'>Пройденные модули</span>
                    </Link>
                    <Link to={`/createdModeles/${userRole}`} className='header-left-button'>
                        <img src={createmoduleImg} className='header-left-buttons-img' alt="create modules" />
                        <span className='header-left-buttons-text'>Созданные модули</span>
                    </Link>
                    <Link to={`/personalAccount/${userRole}`} className='header-left-button'>
                        <img src={UserImg} className='header-left-buttons-img' alt="profile" />
                        <span className='header-left-buttons-text'>Профиль</span>
                    </Link>
                </div>
            </header>

            <div className='right-user-data'>
                <h1>Профиль</h1>
                <span className='title-data'>Данные</span>
                <div className='right-user-info'>
                    <div className='right-user-info-input'>
                        <div className='user-name'>
                            <span>Имя пользователя</span>
                            <input type='text' placeholder={`${userNamePlaceholder}`} onChange={handleUserNameChange} value={userName}/>
                        </div>
                        <div className='user-email'>
                            <span>Email</span>
                            <input type='text' placeholder={`${emailPlaceholder}`} onChange={handleEmailChange} value={email}/>
                        </div>
                    </div>
                    <div className='save-info-user' onClick={saveInfoUser}>Сохранить</div>
                </div>

                <span className='title-data'>Действия</span>
                <div className='right-user-actions'>
                    <img src={Calendar} alt="calendar" />
                    <div className='right-user-actions-info'>
                        <span className='right-user-actions-info-title'>Текущая цепочка: 3 дня</span>
                        <div className='right-user-actions-info-container'>
                            <span >Создано  модулей:<br />{data.userStatisticsDto.modulesCreated}</span>
                            <span>Изучено слов:<br />{data.userStatisticsDto.wordsLearned}</span>
                            <span>Выполнено карточек:<br />{data.userStatisticsDto.cardsCompleted}</span>
                            <span>Выполнено модулей:<br />{data.userStatisticsDto.modulesCompleted}</span>
                            <span>Выполнено подборов:<br />{data.userStatisticsDto.currentStreak}</span>
                            <span>Выполнено тестов:<br />{data.userStatisticsDto.testsCompleted}</span>
                        </div>
                    </div>
                </div>

                <span className='title-data'>Достижения</span>
                <div className='right-user-actions-achievements'>
                    <span>Учеба</span>
                    <div className='right-user-actions-achievements-container'>
                        {study.map((el, index) => (
                            <div
                            key={index}
                            className={`hexagon ${checkStudy(el) ? 'active-achievement' : ''}`}
                            style={{
                                background: checkStudy(el) ? "#3877EE" : "#3877EE99"
                            }}
                            >{el}</div>
                        ))}
                    </div>
                    <span>Цепочка занятий</span>
                    <div className='right-user-actions-achievements-container'>
                        {chain.map((el, index) => (
                            <div
                            key={index}
                            className={`hexagon ${checkStudy(el) ? 'active-achievement' : ''}`}
                            style={{
                                background: checkStudy(el) ? "#3877EE" : "#3877EE99"
                            }}
                            >{el}</div>
                        ))}
                    </div>
                    <span>Изучено модулей</span>
                    <div className='right-user-actions-achievements-container'>
                        {module.map((el, index) => (
                            <div
                            key={index}
                            className={`hexagon ${checkStudy(el) ? 'active-achievement' : ''}`}
                            style={{
                                background: checkStudy(el) ? "#3877EE" : "#3877EE99"
                            }}
                            >{el}</div>
                        ))}
                    </div>
                </div>
                <a className='exit'>Выйти с аккаунта</a>
            </div>
        </div>
    );
}

export default PersonalAccount;
