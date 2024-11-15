import React, { useState } from 'react';
import Burger from './img/icon _burger menu_.png'
import Logo from './img/logo.png'
import DoneModuleImg from './img/Done module.png'
import createmoduleImg from './img/createmodule.png'
import UserImg from './img/user.png'
import './CreatedModeles.css'
import RightContainerCreatedModeles from './CreatedModelesComponents/RightContainer/RightContainerCreatedModeles'
import { Link } from 'react-router-dom'


const CreatedModeles = () => {
    const userRole = JSON.parse(localStorage.getItem('dataUser')).role;
    const [stateBurger, setStateBurger] = useState(false);
    const handleStateBurger = () => {
        if(stateBurger === false) {
            setStateBurger(true)
        } else {
            setStateBurger(false)
        }
    }
    return (
        <div className="created-modules">
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
            <RightContainerCreatedModeles/>
        </div>
    )
}

export default CreatedModeles;