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

    const [backgroundStudy, setBackgroundStudy] = useState(['#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99'])
    const [backgroundLesson, setBackgroundLesson] = useState(['#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99'])
    const [backgroundModule, setBackgroundModule] = useState(['#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99', '#3877EE99'])
    const [data, setData] = useState(null);
    const userRole = JSON.parse(localStorage.getItem('dataUser'))?.role;
    const userToken = JSON.parse(localStorage.getItem('dataUser'))?.token;

    useEffect(() => {
        if (userToken) {
            axios.get('http://localhost:8080/word-learner/api/v1/profile', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })
            .then(response => {
                setData(response.data);
                console.log(response.data); 
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
        }
    }, [userToken]); 

    const checkStudy = (achievementName) => {
        if (data && data.achievements) {
            return data.achievements.some((el) => el.name === achievementName);
        }
        return false;
    };

    if (!data) {
        return <div>Загрузка...</div>; 
    }

    return (
        <div className="personal-account">
            <header className="header-left">
                <div className="header-left-icon">
                    <img src={Burger} className='burger' alt="burger menu" />
                    <img src={Logo} className='header-left-logo' alt="logo" />
                </div>
                <div className='header-left-container-buttons'>
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
                    <div style={{ display: 'flex' }}>
                        <div className='user-name'>
                            <span>Имя пользователя</span>
                            <input type='text' placeholder='Введите имя пользователя' />
                        </div>
                        <div className='user-email'>
                            <span>Email</span>
                            <input type='text' placeholder='Введите email' />
                        </div>
                    </div>
                    <div className='save-info-user'>Сохранить</div>
                </div>

                <span className='title-data'>Действия</span>
                <div className='right-user-actions'>
                    <img src={Calendar} style={{ width: '13vw' }} alt="calendar" />
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
            </div>
        </div>
    );
}

export default PersonalAccount;
