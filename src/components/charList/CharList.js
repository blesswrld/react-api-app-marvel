import React, { Component } from "react"; // исправляем импорт React

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import MarvelService from "../../services/MarvelService";
import "./charList.scss";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 9,
        charEnded: false,
    };

    marvelService = new MarvelService();

    // массив для хранения рефов для каждого персонажа
    charRefs = [];

    componentDidMount() {
        this.onRequest(); // вызываем метод
    }

    // метод который отвечает за запросы
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        // Создаем рефы для новых персонажей
        const newRefs = newCharList.map(() => React.createRef());

        // Объединяем старые рефы с новыми
        this.charRefs = [...this.charRefs, ...newRefs];

        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    // Этот метод создан для оптимизации,
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items = arr.map((item, index) => {
            let imgStyle = { objectFit: "cover" };
            if (
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                imgStyle = { objectFit: "unset" };
            }

            // Функция для обработки фокуса
            const handleFocus = () => {
                this.charRefs[index].current.classList.add(
                    "char__item_selected"
                );
            };

            // Функция для обработки потери фокуса
            const handleBlur = () => {
                this.charRefs[index].current.classList.remove(
                    "char__item_selected"
                );
            };

            return (
                <li
                    className="char__item"
                    key={item.id}
                    ref={this.charRefs[index]} // Привязываем реф к каждому персонажу
                    onFocus={handleFocus} // Добавляем обработчик фокуса
                    onBlur={handleBlur} // Добавляем обработчик потери фокуса
                    tabIndex="0" // Устанавливаем tabIndex, чтобы элемент можно было выделить с помощью Tab
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        // эта конструкция вынесена для центровки спиннера/ошибки
        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } =
            this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ display: charEnded ? "none" : "block" }}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">
                        {newItemLoading ? "Loading..." : "Load more"}{" "}
                        {/* Меняем текст в зависимости от состояния загрузки */}
                    </div>
                </button>
            </div>
        );
    }
}

export default CharList;
