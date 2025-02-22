import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService"; // Импортируем наш сервис
import "./comicsList.scss";

import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]); // Состояние для списка комиксов
    const [loading, setLoading] = useState(false); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки
    const [offset, setOffset] = useState(0); // Смещение для подгрузки
    const [charEnded, setCharEnded] = useState(false); // Флаг окончания подгрузки

    // Используем наш кастомный хук для получения данных
    const { getAllComics } = useMarvelService();

    // Функция для подгрузки комиксов
    const fetchComics = async (offset) => {
        setLoading(true);
        setError(null);
        try {
            const newComics = await getAllComics(offset); // Получаем новые комиксы
            setComicsList((prevList) => [...prevList, ...newComics]); // Добавляем новые комиксы к старым
            if (newComics.length < 8) {
                setCharEnded(true); // Если получено меньше 8 комиксов, значит подгрузка завершена
            }
        } catch (e) {
            setError("Error loading comics"); // Обработка ошибок
        } finally {
            setLoading(false);
        }
    };

    // Подгружаем комиксы при изменении смещения
    useEffect(() => {
        fetchComics(offset);
    }, [offset]);

    // Функция для подгрузки новых комиксов
    const loadMoreComics = () => {
        setOffset((prevOffset) => prevOffset + 8); // Увеличиваем offset для подгрузки (на 8)
    };

    // Функция для обработки ошибки изображения и замены его на запасное
    const handleImageError = (e) => {
        e.target.src = uw; // В случае ошибки подгрузки, ставим запасное изображение
    };

    // Рендерим элементы списка
    const renderItems = (arr) => {
        return arr.map((item, i) => (
            <li key={i} className="comics__item">
                <a href={item.urls?.[0]?.url || "#"}>
                    {" "}
                    {/* Добавлена проверка на urls[0]?.url */}
                    <img
                        src={
                            item.thumbnail?.path +
                            "." +
                            item.thumbnail?.extension
                        }
                        alt={item.title || "Comic"}
                        className="comics__item-img"
                        onError={handleImageError} // Обработчик ошибки для подмены изображения
                    />
                    <div className="comics__item-name">
                        {item.title || "No Title"}
                    </div>
                    <div className="comics__item-price">
                        {item.price || "Not available"}
                    </div>
                </a>
            </li>
        ));
    };

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {renderItems(comicsList)} {/* Рендерим список комиксов */}
            </ul>
            {loading && <Spinner />}{" "}
            {/* Показываем спиннер во время загрузки */}
            {error && <ErrorMessage />} {/* Показываем сообщение об ошибке */}
            {!charEnded && (
                <button
                    className="button button__main button__long"
                    onClick={loadMoreComics}
                >
                    <div className="inner">Load More</div>
                </button>
            )}
        </div>
    );
};

export default ComicsList;
