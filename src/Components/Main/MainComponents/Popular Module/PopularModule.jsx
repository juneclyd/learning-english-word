import User from '../../img/user.png'
import './PopularModule.css'
const data = ['','','','']
const PopularModule = () => {
    return(
        <div className="PopularModule">
            <span className='popular-module-title'>Популярные модули</span>
            <div className="popular-module-container">
                {data.map((el, index) => {
                    return (
                        <div className="block" key={index}>
                            <span className='block-title'>Название</span>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <span className='block-info'>10 cлов</span>
                                <div className="vertic"></div>
                                <span className='block-info'>Создано: 13.10.2024</span>
                                <div className="vertic"></div>
                                <img src={User} alt="" style={{ marginRight: '0.6vw' }} />
                                <span className='block-info'>Автор</span>
                            </div>
                            <a className='block-button'>Перейти</a>
                        </div>
                    );       
                })}
                
            </div>
        </div>
    )
}

export default PopularModule