import img from "./error.gif";

const ErrorMessage = () => {
    return (
        <img
            style={{
                display: "block",
                width: "250px",
                height: "250px",
                objectFit: "contain",
                margin: "0 auto",
            }}
            src={img}
            alt="Error"
        />
    );
};

// <img src={process.env.PUBLIC_URL + "/error.gif"} />; обращение к папке public

export default ErrorMessage;
