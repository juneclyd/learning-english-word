import Train from "../../img/🦆 illustration _Train travel_.png"
import { Link } from 'react-router-dom'

const BlockOne = () => {
    return(
        <div className="block-one">
            <div className="block-one-info">
                <h1>Изучайте английские слова в<br className="br"></br> своем темпе!</h1>
                <span>Ваша личная школа английских слов!<br></br>
                Занимайтесь в любое время, влюбом месте!</span>
                <Link to='/login'>Начать  учиться</Link>
            </div>
            <img src={Train}/>
        </div>
    )
}

export default BlockOne;