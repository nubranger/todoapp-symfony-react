import React from 'react';
import {Spinner} from "reactstrap";

const Loading = () => {
    return (
        <div className="loading">
            <Spinner type="grow" color="primary"> </Spinner>
        </div>
    );
};

export default Loading;
