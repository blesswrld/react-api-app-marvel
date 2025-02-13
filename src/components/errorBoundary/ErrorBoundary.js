import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// 1. Предохранители не ловят ошибки которые происходят внутри обработчиков событий
// 2. Предохранители не ловят ошибки в ассинхронных операциях
// 3. Предохранители не ловят ошибки внутри других ошибок

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    // static getDerivedStateFromError(error) {
    //     return { error: true };
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
