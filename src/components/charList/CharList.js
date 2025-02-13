import React, { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

import abyss from "../../resources/img/abyss.jpg";

const CharList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    // Функция для загрузки персонажей
    const loadCharacters = async () => {
        setLoading(true);
        try {
            const newCharacters = await marvelService.getAllCharacters(
                characters.length
            );
            // Добавляем новых персонажей в список, проверяя, что их еще нет в списке
            setCharacters((prevChars) => [
                ...prevChars,
                ...newCharacters.filter(
                    (newChar) =>
                        !prevChars.some(
                            (prevChar) => prevChar.id === newChar.id
                        )
                ),
            ]);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    // Обработчик нажатия на кнопку "load more"
    const handleLoadMore = () => {
        loadCharacters();
    };

    if (error) {
        return <div>Something went wrong while fetching characters.</div>;
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {characters.map((char) => (
                    <li key={`${char.id}-${char.name}`} className="char__item">
                        <img
                            src={
                                char.thumbnail.path +
                                "." +
                                char.thumbnail.extension
                            }
                            alt={char.name}
                        />
                        <div className="char__name">{char.name}</div>
                    </li>
                ))}
            </ul>
            <button
                className="button button__main button__long"
                onClick={handleLoadMore}
                disabled={loading}
            >
                <div className="inner">
                    {loading ? "Loading..." : "Load More"}
                </div>
            </button>
        </div>
    );
};

export default CharList;
