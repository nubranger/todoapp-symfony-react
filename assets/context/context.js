import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';

const MyContext = createContext();

const MyProvider = ({children}) => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({type: "", text: ""});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [account, setAccount] = useState("");
    const [roles, setRoles] = useState("");

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

    const handleLogout = (e) => {
        e.preventDefault();

        axios.post('/logout')
            .then(response => {
                if (response.status === 200) {
                    setAccount("");
                    setRoles("");
                }
            }).catch(error => {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Unknown error");
            }
        })


    }

    const handleAccount = ({email, password}) => {

        if (email === "" || password === "") {
            setError("Enter all fields");
        } else {
            setError("");
            axios.post('/login', {
                    username: email,
                    password: password
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    setAccount(response.headers.username);
                    setRoles(response.headers.roles);
                }).catch(error => {
                if (error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("Unknown error");
                }

            })
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

    useEffect(() => {
        if (window.user) {
            let user = window.user;
            setAccount(user.username);
            setRoles(user.roles[0]);
        }
    }, []);

    return (
        <MyContext.Provider
            value={{
                list,
                setList,
                addTodo, deleteTodo, editTodo,
                loading,
                setLoading,
                alert, setAlert,

                error,
                setPassword,
                setEmail,
                handleAccount,
                handleLogout,
                account,
                roles, setRoles
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export {MyProvider, MyContext};
