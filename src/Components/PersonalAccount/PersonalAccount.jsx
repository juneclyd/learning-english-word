import React, { useState } from 'react';
import Burger from './img/🦆 icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import UserImg from './img/user.png';
import Calendar from './img/Calendar.png';
import './PersonalAccount.css'

const PersonalAccount = () => {
    const study = ['активный ученик', 'упорный ученик', 'пробивной ученик', 'создатель модулей', 'мастер карточек', 'мастер подборов', 'мастер тестов']
    const chain = ['3 дня', '5 дня', '10 дней', '15 дней', '40 дней', '100 дней', '300 дней']
    const module = ['1 модуль', '3 модуля', '10 модулей', '15 модулей', '40 модулей', '100 модулей', '300 модулей']
    return(
        <div className="personal-account">
            <header className="header-left">
                <div className="header-left-icon">
                    <img src={Burger} className='burger' alt="" />
                    <img src={Logo} className='header-left-logo' alt="" />
                </div>
                <div className='header-left-container-buttons'>
                    <a className='header-left-button'>
                        <img src={DoneModuleImg} className='header-left-buttons-img' />
                        <span className='header-left-buttons-text'>Пройденные модули</span>
                    </a>
                    <a className='header-left-button'>
                        <img src={createmoduleImg} className='header-left-buttons-img' />
                        <span className='header-left-buttons-text'>Созданные модули</span>
                    </a>
                    <a className='header-left-button'>
                        <img src={UserImg} className='header-left-buttons-img' />
                        <span className='header-left-buttons-text'>Профиль</span>
                    </a>
                </div>
            </header>

            <div className='right-user-data'>
                <h1>Профиль</h1>
                <span className='title-data'>Данные</span>
                <div className='right-user-info'>
                    <div style={{display: 'flex'}}>
                        <div className='user-name'>
                            <span>Имя пользователя</span>
                            <input type='text' placeholder='Введите имя пользователя'/>
                        </div>
                        <div className='user-email'>
                            <span>Email</span>
                            <input type='text' placeholder='Введите email'/>
                        </div>
                    </div>
                    <div className='save-info-user'>Сохранить</div>
                </div>

                <span className='title-data'>Действия</span>
                <div className='right-user-actions'>
                    <img src={Calendar} style={{with: '13vw'}}/>
                    <div className='right-user-actions-info'>
                        <span className='right-user-actions-info-title'>Текущая цепочка: 3 дня</span>
                        <div className='right-user-actions-info-container'>
                            <span>Создано  модулей:<br></br>100</span>
                            <span>Изучено слов:<br></br>100</span>
                            <span>Выполнено  карточек:<br></br>100</span>
                            <span>Выполнено модулей:<br></br>100</span>
                            <span>Выполнено  подборов:<br></br>100</span>
                            <span>Выполнено  тестов:<br></br>100</span>
                        </div>
                    </div>
                </div>

                <span className='title-data'>Достижения</span>
                <div className='right-user-actions-achievements'>
                    <span>Учеба</span>
                    <div className='right-user-actions-achievements-container'>
                        {study.map(el => (
                            <div class="hexagon" id="hexagon">{el}</div>
                        ))}
                    </div>
                    <span>Цепочка занятий</span>
                    <div className='right-user-actions-achievements-container'>
                        {chain.map(el => (
                            <div class="hexagon" id="hexagon">{el}</div>
                        ))}
                    </div>
                    <span>Изучено модулей</span>
                    <div className='right-user-actions-achievements-container'>
                        {module.map(el => (
                            <div class="hexagon" id="hexagon">{el}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalAccount