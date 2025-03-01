import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import "./comicsList.scss";

// import uw from "../../resources/img/UW.png";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllComics } = useMarvelService();

    const fetchComics = async (offset) => {
        setLoading(true);
        setError(null);
        try {
            const newComics = await getAllComics(offset);
            setComicsList((prevList) => [...prevList, ...newComics]);
            if (newComics.length < 8) {
                setCharEnded(true);
            }
        } catch (e) {
            setError("Error loading comics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComics(offset);
    }, [offset]);

    const loadMoreComics = () => {
        setOffset((prevOffset) => prevOffset + 8);
    };

    // Функция для обработки ошибки изображения и замены его на запасное
    // const handleImageError = (e) => {
    //     e.target.src = uw; // В случае ошибки подгрузки, ставим запасное изображение
    // };

    // (апишки марвел для комиксов не работают, поэтому при желании их можно заменить на статичное изображение, используя метод handleImageError)
    const renderItems = (arr) => {
        return arr.map((item, i) => (
            <li key={i} className="comics__item">
                <Link to={`/comics/${item.id}`}>
                    {" "}
                    <img
                        src={
                            item.thumbnail?.path +
                            "." +
                            item.thumbnail?.extension
                        }
                        alt={item.title || "Comic"}
                        className="comics__item-img"
                        // onError={handleImageError} // Обработчик ошибки для подмены изображения
                    />
                    <div className="comics__item-name">
                        {item.title || "No Title"}
                    </div>
                    <div className="comics__item-price">
                        {item.price || "Not available"}
                    </div>
                </Link>
            </li>
        ));
    };

    return (
        <div className="comics__list">
            <ul className="comics__grid">{renderItems(comicsList)}</ul>
            {loading && <Spinner />} {error && <ErrorMessage />}
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
