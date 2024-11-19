import './Module.css'
import Burger from './img/icon _burger menu_.png'
import Logo from './img/logo.png'
import DoneModuleImg from './img/Done module.png'
import createmoduleImg from './img/createmodule.png'
import UserImg from './img/user.png'
import FullModules from './img/FullModules.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Module = () => {
    const [stateBurger, setStateBurger] = useState(false);
    const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
    const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);
    const infoModule = ['Карточки', 'Подбор', 'Тест'];
    const btnModule = ['cat - кошка','cat - кошка','cat - кошка', 'cat - кошка','cat - кошка', 'cat - кошка', 'cat - кошка', 'cat - кошка', 'cat - кошка']
    const handleStateBurger = () => {
        if(stateBurger === false) {
            setStateBurger(true)
        } else {
            setStateBurger(false)
        }
    }
    const [buttonAdmin, setButtonAdmin] = useState(false);
    useEffect(() => {
        setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
        if (userRole === 'ROLE_ADMIN') {
            setButtonAdmin(true);
        } else {
            setButtonAdmin(false);
        }
    }, [userRole]);
    return (
        <div className='module'>    
            <header className="header-left">
                <div className="header-left-icon">
                <img src={Burger} onClick={handleStateBurger} className='burger' alt="" />
                    <img src={Logo} className='header-left-logo' alt="" />
                </div>
                <div className='header-left-container-buttons' style={!stateBurger ? {display: 'inline-flex'} : {display: 'none'}}>
                    <Link to={`/fullModules/:${userRole}`} className='header-left-button'>
                        <img src={FullModules} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Список модулей</span>
                    </Link>
                    <Link to={`/passedModule/:${userRole}`} className='header-left-button'>
                        <img src={DoneModuleImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Пройденные модули</span>
                    </Link>
                    <Link to={`/createdModeles/:${userRole}`} className='header-left-button' style={buttonAdmin ? { display: 'flex' } : { display: 'none' }}>
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