import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    // Объявление переменных
    const _apiBase = "https://gateway.marvel.com/v1/public/";
    const _apiKey = "apikey=6055b9373f97c4317e477f9dfd6e43d5";
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0]?.url,
            wiki: char.urls[1]?.url,
            // Здесь должны быть комиксы следующими
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
    };
};

export default useMarvelService;
