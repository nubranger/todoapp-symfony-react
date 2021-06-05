import React, {useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';

const MyContext = React.createContext();

const MyProvider = ({children}) => {

    const [list, setList] = useState([]);

    return (
        <MyContext.Provider
            value={{
                list,
                setList
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export {MyProvider, MyContext};
