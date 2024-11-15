import './Module.css'
import Burger from './img/icon _burger menu_.png'
import Logo from './img/logo.png'
import DoneModuleImg from './img/Done module.png'
import createmoduleImg from './img/createmodule.png'
import UserImg from './img/user.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Module = () => {
    const [stateBurger, setStateBurger] = useState(false);
    const userRole = JSON.parse(localStorage.getItem('dataUser')).role;
    const infoModule = ['Карточки', 'Подбор', 'Тест'];
    const btnModule = ['cat - кошка','cat - кошка','cat - кошка', 'cat - кошка','cat - кошка', 'cat - кошка', 'cat - кошка', 'cat - кошка', 'cat - кошка']
    const handleStateBurger = () => {
        if(stateBurger === false) {
            setStateBurger(true)
        } else {
            setStateBurger(false)
        }
    }
    return (
        <div className='module'>    
            <header className="header-left">
                <div className="header-left-icon">
                <img src={Burger} onClick={handleStateBurger} className='burger' alt="" />
                    <img src={Logo} className='header-left-logo' alt="" />
                </div>
                <div className='header-left-container-buttons' style={!stateBurger ? {display: 'inline-flex'} : {display: 'none'}}>
                    <Link to={`/createdModeles/:${userRole}`} className='header-left-button'>
                        <img src={DoneModuleImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Пройденные модули</span>
                    </Link>
                    <Link to={`/createdModeles/:${userRole}`} className='header-left-button'>
                        <img src={createmoduleImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Созданные модули</span>
                    </Link>
                    <Link to={`/personalAccount/:${userRole}`} className='header-left-button'>
                        <img src={UserImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Профиль</span>
                    </Link>
                </div>
            </header>
            <div className='right-cart-model'>
                <h1>Название модуля</h1>
                <h2>Описание модуля</h2>
                <div className='container-info-module'>
                    {infoModule.map((el, index) => (
                        <div key={index} className='info-block-module'>{el}</div>
                    ))}
                </div>
                <div className='container-module-buttons'>
                    {btnModule.map((el, index) => (
                        <div className='module-buttons'>{el}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Module;