import React, { useState } from 'react';
import Burger from './img/🦆 icon _burger menu_.png';
import Logo from './img/logo.png';
import DoneModuleImg from './img/Done module.png';
import createmoduleImg from './img/createmodule.png';
import UserImg from './img/user.png';
import './createModel.css';
import axios from 'axios';

const CreateModel = () => {
    const [wordsRender, setWordsRender] = useState([{ id: 0, wordEn: '', wordRu: '', cardImg: [] }]);
    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [errors, setErrors] = useState({ title: '', description: '', words: [] });
    const [containerHeigh, setcontainerHeigh] = useState(71);
    const [stateBurger, setStateBurger] = useState(false)

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

    const handleStateBurger = () => {
        if(stateBurger === false) {
            setStateBurger(true)
        } else {
            setStateBurger(false)
        }
    }

    const addWord = () => {
        setWordsRender(prevWords => [...prevWords, { id: prevWords.length, wordEn: '', wordRu: '', cardImg: []}]);
    };

    const deleteWord = (index) => {
        setWordsRender(prevWords => prevWords.filter((_, i) => i !== index));
    };

    const handleFileChange = (index, event) => {
        const selectedFiles = Array.from(event.target.files);
        const newCardImg = selectedFiles.map(file => file.name); // сохраняем только имя файла
        setWordsRender(prevWords => {
            const newWords = [...prevWords];
            newWords[index].cardImg = newCardImg; // записываем только имена файлов
            return newWords;
        });
    };

    const removeFile = (index, fileName) => {
        setWordsRender(prevWords => {
            const newWords = [...prevWords];
            newWords[index].cardImg = newWords[index].cardImg.filter(name => name !== fileName);
            return newWords;
        });
    };

    const handleWordChange = (index, field, value) => {
        const newWords = [...wordsRender];
        newWords[index][field] = value;
        setWordsRender(newWords);
    };

    const handleSave = () => {
        console.log(wordsRender);
        if (validateInputs()) {
            const formData = new FormData();
    
            // Append module metadata
            formData.append('module', JSON.stringify({
                title: moduleTitle,
                description: moduleDescription,
                wordCount: wordsRender.length,
                words: wordsRender.map(word => ({
                    wordEn: word.wordEn,
                    wordRu: word.wordRu,
                    cardImg: word.cardImg
                }))
            }));
            console.log(formData)
            // Append images (one or more files for each word)
            wordsRender.forEach((word, index) => {
                word.cardImg.forEach(fileName => {
                    const filePath = `/path/to/images/${fileName}`; // This assumes you are storing images locally on your server
                    formData.append('cardImages', new File([filePath], fileName, { type: 'image/jpeg' }));
                });
            });
    
            // Send the request with FormData
            axios.post('http://localhost:8080/word-learner/api/v1/modules', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': '*/*',
                }
            })
            .then(response => {
                console.log('Module saved successfully:', response.data);
                // Handle success, maybe clear form or redirect
            })
            .catch(error => {
                console.error('Error saving module:', error);
                // Handle error, maybe show a user-friendly message
            });
        }
    };
    
    

    return (
        <div className="create-module">
            <header className="header-left">
                <div className="header-left-icon">
                    <img src={Burger} onClick={handleStateBurger} className='burger' alt="" />
                    <img src={Logo} className='header-left-logo' alt=""/>
                </div>
                <div className='header-left-container-buttons'  style={!stateBurger ? {display: 'inline-flex'} : {display: 'none'} }>
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
                            <div style={{ display: 'flex' }} className='container-task-word-block'>
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
                                                
                                                {/* Условие для отображения или текста, или списка файлов */}
                                                {el.cardImg.length === 0 ? (
                                                    <span>Загрузить изображение</span>
                                                ) : (
                                                    <div className="input-file-list">
                                                        {el.cardImg.map(fileName => (
                                                            <div key={fileName} className="input-file-list-item">
                                                                <span>{fileName}</span> {/* Показываем только имя файла */}
                                                                <a href="#" onClick={() => removeFile(index, fileName)} className="input-file-list-remove">x</a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </label>
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
