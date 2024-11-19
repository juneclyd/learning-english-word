import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Pagination, TextField, Stack } from "@mui/material";
import './RightContainerCreatedModeles.css';

const RightContainerCreatedModeles = (props) => {
  console.log(props);
  const [posts, setPosts] = useState([]); // Все данные
  const [filteredPosts, setFilteredPosts] = useState([]); // Отфильтрованные данные
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
  const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);
  const navigate = useNavigate();

  // Пагинация данных
  const pagination = (data) => {
    let paginationLength = data.length;
    const finishResultData = [];
    let modifiedEndElement = 9;
    let modifiedInitElement = 0;

    while (modifiedInitElement < paginationLength) {
      finishResultData.push(data.slice(modifiedInitElement, modifiedEndElement));
      modifiedInitElement += 9;
      modifiedEndElement += 9;
    }

    return finishResultData;
  };

  // Делаем запрос к серверу для получения всех данных
  useEffect(() => {
    setuserToken(JSON.parse(localStorage.getItem('dataUser')))
    axios.get('http://localhost:8080/word-learner/api/v1/modules', {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    .then(({ data }) => {
      console.log(data);
      setPosts(data); // Сохраняем все данные
      setFilteredPosts(data); // Изначально отображаем все данные
      setPageQty(Math.ceil(data.length / 9)); // Обновляем количество страниц
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
  }, [userToken]);

  // Фильтрация данных на основе поискового запроса
  useEffect(() => {
    // Фильтруем данные по запросу
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.wordCount.toString().includes(query)
    );
    setFilteredPosts(filtered); // Обновляем отфильтрованные данные
    setPage(1); // Сбрасываем страницу на 1 при новом запросе
  }, [query, posts]);

  // Переход к созданию нового модуля
  const clikCreateModule = () => {
    setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
    navigate(`/createModel/${userRole}`);
  };

  // Переход к детальному просмотру модуля
  const clikGoOver = (id) => {
    setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
    localStorage.setItem("idModule", JSON.stringify(id));
    navigate(`/moduleOverview/${userRole}`);
  };

  return (
    <div>
      <Container sx={{ marginTop: 5, maxWidth: 0 }} maxWidth="md">
        <div className="full-modules-textField">
          <TextField
              fullWidth
              value={query}
              onChange={(event) => setQuery(event.target.value)} // Обновляем запрос
              variant="outlined"
              // placeholder="Введите название модуля"
          />
        </div>
        <div className="full-modules-title-button">
          <h1 className="full-modules-title">Список модулей</h1>
        </div>

        <Stack spacing={2}>
          <div className="container-full-modules">
            {filteredPosts.slice((page - 1) * 9, page * 9).map((post) => (
              <div key={post.objectID} className="block-full-module">
                <span className="block-full-module-title">{post.title}</span>
                <div className="block-full-module-date">
                  <span className="block-full-module-info">{post.wordCount} слов</span>
                  <div className="block-full-module-line"></div>
                  <span className="block-full-module-info">
                    Создано: {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div onClick={() => clikGoOver(post.id)} className="block-full-module-cell">
                  Перейти
                </div>
              </div>
            ))}
          </div>

          {!!filteredPosts.length && (
            <Pagination
              count={Math.ceil(filteredPosts.length / 9)}
              page={page}
              onChange={(_, num) => setPage(num)} // Обработчик для изменения страницы
              hidePrevButton
              hideNextButton
              sx={{ marginY: 3, marginX: "auto" }}
            />
          )}
        </Stack>
      </Container>
    </div>
  );
};

export default RightContainerCreatedModeles;
