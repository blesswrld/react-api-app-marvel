import { Component } from "react";

// import PropTypes from "prop-types"; // Импортируем PropTypes

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

class App extends Component {
    state = {
        selectedChar: null,
    };

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id,
        });
    };

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected} />
                        <CharInfo charId={this.state.selectedChar} />
                    </div>
                    <img
                        className="bg-decoration"
                        src={decoration}
                        alt="vision"
                    />
                </main>
            </div>
        );
    }
}

// PropTypes для CharList
// CharList.propTypes = {
//     onCharSelected: PropTypes.func.isRequired, // ожидается функция
// };

export default App;
