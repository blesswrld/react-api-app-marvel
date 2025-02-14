import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

// import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const App = () => {
    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <ErrorBoundary> */}
                <RandomChar />
                {/* </ErrorBoundary> */}
                <div className="char__content">
                    <CharList />
                    <CharInfo />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    );
};

export default App;
