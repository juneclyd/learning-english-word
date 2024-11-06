import Train from "../../img/Hexagons.png"

const BlockThree = () => {
    return(
        <div className="block-three">
            <div className="block-three-info">
                <h1>Ваши достижения – это ваша гордость!</h1>
                <span>Здесь вы можете увидеть свои достижения в изучении английских слов. Каждый новый уровень, пройденный тест, изученное слово – это шаг к вашей цели! </span>
                <a>Начать учиться</a>
            </div>
            <img src={Train}/>
        </div>
    )
}

export default BlockThree;