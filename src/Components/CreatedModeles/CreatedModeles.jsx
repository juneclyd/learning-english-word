import Burger from './img/🦆 icon _burger menu_.png'
import Logo from './img/logo.png'
import DoneModuleImg from './img/Done module.png'
import createmoduleImg from './img/createmodule.png'
import UserImg from './img/user.png'
import './CreatedModeles.css'
import RightContainerCreatedModeles from './CreatedModelesComponents/RightContainer/RightContainerCreatedModeles'


const CreatedModeles = () => {
    return (
        <div className="created-modules">
            <header className="header-left">
                <div className="header-left-icon">
                    <img src={Burger} className='burger' alt="" />
                    <img src={Logo} className='header-left-logo' alt="" />
                </div>
                <div className='header-left-container-buttons'>
                    <a className='header-left-button'>
                        <img src={DoneModuleImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Пройденные модули</span>
                    </a>
                    <a className='header-left-button'>
                        <img src={createmoduleImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Созданные модули</span>
                    </a>
                    <a className='header-left-button'>
                        <img src={UserImg} className='header-left-buttons-img'/>
                        <span className='header-left-buttons-text'>Профиль</span>
                    </a>
                </div>
            </header>
            <RightContainerCreatedModeles/>
        </div>
    )
}

export default CreatedModeles;