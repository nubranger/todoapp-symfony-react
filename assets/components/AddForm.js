import React, {useContext, useState} from 'react';
import {Alert, Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {MyContext} from "../context/context";


const AddForm = () => {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const {addTodo, alert} = useContext(MyContext);


    return (
        <Form onSubmit={e => e.preventDefault()}>
            <FormGroup>
                <Label for="exampleTask">Task</Label>
                <Input className={!task ? "is-invalid" : "is-valid"} onChange={e => setTask(e.target.value)} name="task"
                       id="exampleTask"/>
                <FormFeedback>Please enter something!</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input className={!description ? "is-invalid" : "is-valid"}
                       onChange={e => setDescription(e.target.value)} type="textarea" name="text"
                       id="exampleText"/>
                <FormFeedback>Please enter something!</FormFeedback>
            </FormGroup>
            <div className="formControl mt-2">
                <Button onClick={() => addTodo({task, description})}>Add</Button>
                <Alert color={alert.type}>{alert.text}</Alert>
                {/*<Alert color="primary">SDfg</Alert>*/}
            </div>
        </Form>
    );
};

export default AddForm;
