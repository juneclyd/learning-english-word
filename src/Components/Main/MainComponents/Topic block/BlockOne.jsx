import Train from "../../img/🦆 illustration _Train travel_.png"

const BlockOne = () => {
    return(
        <div className="block-one">
            <div className="block-one-info">
                <h1>Изучайте английские слова в<br className="br"></br> своем темпе!</h1>
                <span>Ваша личная школа английских слов!<br></br>
                Занимайтесь в любое время, влюбом месте!</span>
                <a>Начать  учиться</a>
            </div>
            <img src={Train}/>
        </div>
    )
}

export default BlockOne;