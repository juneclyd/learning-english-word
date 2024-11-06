import React, { useState } from 'react';
import Burger from './img/🦆 icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import UserImg from './img/user.png';
import './createModel.css';

const CreateModel = () => {
    const [wordsRender, setWordsRender] = useState([{ id: 0, wordEn: '', wordRu: '', cardImg: [] }]);
    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [errors, setErrors] = useState({ title: '', description: '', words: [] });
    const [containerHeigh, setcontainerHeigh] = useState(71);

    const validateInputs = () => {
        let valid = true;
        const newErrors = { title: '', description: '', words: [] };

        if (!moduleTitle) {
            newErrors.title = 'Название модуля не может быть пустым';
            valid = false;
        }

        if (!moduleDescription) {
            newErrors.description = 'Описание модуля не может быть пустым';
            valid = false;
        }

        wordsRender.forEach((word, index) => {
            if (!word.wordEn || !word.wordRu) {
                newErrors.words[index] = 'Слово и перевод не могут быть пустыми';
                valid = false;
            } else {
                newErrors.words[index] = ''; // сброс ошибки если поле заполнено
            }
        });

        setErrors(newErrors);
        return valid;
    };

    const addWord = () => {
        setWordsRender(prevWords => [...prevWords, { id: prevWords.length, wordEn: '', wordRu: '', cardImg: []}]);
    };

    const deleteWord = (index) => {
        setWordsRender(prevWords => prevWords.filter((_, i) => i !== index));
    };

    const handleFileChange = (index, event) => {
        const selectedFiles = Array.from(event.target.files);
        const newCardImg = selectedFiles.map(file => URL.createObjectURL(file)); // создаем URL для каждого файла
        setWordsRender(prevWords => {
            const newWords = [...prevWords];
            newWords[index].cardImg = newCardImg; // записываем только URL
            return newWords;
        });
        console.log(selectedFiles)
    };

    const removeFile = (index, fileURL) => {
        setWordsRender(prevWords => {
            const newWords = [...prevWords];
            newWords[index].cardImg = newWords[index].cardImg.filter(url => url !== fileURL);
            return newWords;
        });
    };

    const handleWordChange = (index, field, value) => {
        const newWords = [...wordsRender];
        newWords[index][field] = value;
        setWordsRender(newWords);
    };

    const handleSave = () => {
        if (validateInputs()) {
            const dataToSave = {
                title: moduleTitle,
                description: moduleDescription,
                words: wordsRender
            };
            console.log(dataToSave); // Здесь вы можете выполнить действие с данными, например, отправить их на сервер
        }
    };

    return (
        <div className="create-module">
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
            <div className='right-create-model'>
                <h1>Создать модуль</h1>
                <div className='right-create-model-info'>
                    <span>Название</span>
                    <input 
                        type="text" 
                        className={`input-title ${errors.title ? 'error' : ''}`} 
                        placeholder='Введите название' 
                        value={moduleTitle}
                        onChange={(e) => setModuleTitle(e.target.value)}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                    <span>Описание</span>
                    <input 
                        type="text" 
                        className={`input-info ${errors.description ? 'error' : ''}`} 
                        placeholder='Введите описание' 
                        value={moduleDescription}
                        onChange={(e) => setModuleDescription(e.target.value)}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>
                {
                    wordsRender.map((el, index) => (
                        <div key={el.id} className='container-tasks-words'>
                            <div style={{ display: 'flex' }}>
                                <div className='container-tasks-words-input'>
                                    <span>Слово</span>
                                    <input 
                                        type='text' 
                                        className={`word-input ${errors.words[index] ? 'error' : ''}`} 
                                        placeholder='Введите слово' 
                                        value={el.wordEn} 
                                        onChange={(e) => handleWordChange(index, 'wordEn', e.target.value)} 
                                    />
                                    {errors.words[index] && <span className="error-message">{errors.words[index]}</span>}
                                </div>
                                <div className='container-tasks-words-input'>
                                    <span>Перевод</span>
                                    <input 
                                        type='text' 
                                        className={`word-input ${errors.words[index] ? 'error' : ''}`} 
                                        placeholder='Введите перевод' 
                                        value={el.wordRu} 
                                        onChange={(e) => handleWordChange(index, 'wordRu', e.target.value)} 
                                    />
                                    {errors.words[index] && <span className="error-message">{errors.words[index]}</span>}
                                </div>
                                <div className='container-tasks-words-input'>
                                    <span>Изображение</span>
                                    <form method="post" encType="multipart/form-data" key={el.id}>
                                        <div className="input-file-row">
                                            <label className="input-file">
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleFileChange(index, e)} 
                                                    multiple
                                                    accept="image/*"
                                                />
                                                <span>Загрузить изображение</span>
                                            </label>
                                        </div>
                                        <div className="input-file-list">
                                            {el.cardImg.map(url => (
                                                <div key={url} className="input-file-list-item">
                                                    <img src={url} alt="uploaded" className="uploaded-image" />
                                                    <a href="#" onClick={() => removeFile(index, url)} className="input-file-list-remove">x</a>
                                                </div>
                                            ))}
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='btn-delete-task-word' onClick={() => deleteWord(index)}>Удалить</div>
                        </div>
                    ))
                }
                <div style={{ display: 'flex', marginBottom: '6vw' }}>
                    <div onClick={addWord} style={{ cursor: 'pointer' }} className='add-tasks-words'>Добавить слово</div>
                    <div onClick={handleSave} style={{ cursor: 'pointer' }} className='save-words'>Сохранить</div>
                </div>
            </div>
        </div>
    );
};

export default CreateModel;
