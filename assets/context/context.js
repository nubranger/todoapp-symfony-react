import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';

const MyContext = createContext();

const MyProvider = ({children}) => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({type: "", text: ""});

    const handleAlert = (props) => {

        setTimeout(() => {
            setAlert({type: "", text: ""});
        }, 2000);

        if (props === "del") {
            setAlert({type: "danger", text: "Task deleted!"})
        }
        if (props === "add") {
            setAlert({type: "primary", text: "Task added!"})
        }
        if (props === "wrong") {
            setAlert({type: "warning", text: "Something is wrong!"})
        }
        if (props === "edit") {
            setAlert({type: "success", text: "Task edited!"})
        }
    }

    //add
    const addTodo = (props) => {
        setLoading(true);

        if (!props.description || !props.task) {
            console.log("empty")
        } else {
            axios.post('/create', props)
                .then(response => {

                    let newObj = {id: response.data.id, ...props};

                    if (response.status === 201) {
                        let newData = [...list, newObj];
                        setList(newData);
                        setLoading(false);
                        handleAlert("add");
                    } else {
                        setLoading(true);
                        handleAlert("wrong");
                    }
                }).catch(error => {
                console.error(error);
            });
        }
    }

    //get
    const getTodo = () => {
        setLoading(true);

        axios.get('/todolist')
            .then(response => {
                setList(response.data);
                setLoading(false);
            }).catch(error => {
            console.error(error);
        });
    }

    //delete
    const deleteTodo = (props) => {
        setLoading(true);

        axios.delete('/delete/' + props)
            .then(response => {
                if (response.status === 202) {
                    let newData = [...list];
                    newData = newData.filter((item) => item.id !== props);
                    setList(newData);
                    setLoading(false);
                    handleAlert("del");
                } else {
                    setLoading(true);
                    handleAlert("wrong");
                }
            }).catch(error => {
            console.error(error);
        });
    }

    //edit
    const editTodo = (props) => {
        setLoading(true);

        let newObj = {id: props.item.id, task: props.task, description: props.description};

        axios.put('/edit/' + props.item.id, newObj)
            .then(response => {

                if (response.status === 204) {
                    let newData = [...list];
                    newData.splice(props.index, 1, newObj)

                    setList(newData);
                    setLoading(false);
                    handleAlert("edit");
                } else {
                    setLoading(true);
                    handleAlert("wrong");
                }
            }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getTodo();
    }, []);


    return (
        <MyContext.Provider
            value={{
                list,
                setList,
                addTodo, deleteTodo, editTodo,
                loading,
                setLoading,
                alert, setAlert
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export {MyProvider, MyContext};
