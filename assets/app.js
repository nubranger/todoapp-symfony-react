import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/scss/main.scss";
import {MyProvider} from "./context/context";
import Pages from "./pages/Pages";

const App = () => {
    return (
        <>
            <MyProvider>
                <Pages/>
            </MyProvider>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));