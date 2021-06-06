import React, {useContext, useState} from 'react';
import {
    Button,
    Form,
    FormGroup, Input, Label, ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader
} from "reactstrap";
import {MyContext} from "../context/context";

const ListItem = ({item, index}) => {
    const [modal, setModal] = useState(false);
    const [task, setTask] = useState(item.task);
    const [description, setDescription] = useState(item.description);

    const toggle = () => setModal(!modal);

    const {deleteTodo, editTodo} = useContext(MyContext);

    return (
        <ListGroupItem key={index}>
            <ListGroupItemHeading>{item.task}</ListGroupItemHeading>
            <ListGroupItemText>
                {item.description}
            </ListGroupItemText>
            <Button onClick={toggle} outline color="primary">edit</Button>{' '}
            <Button onClick={() => deleteTodo(item.id)}
                    outline
                    color="danger"
            >
                delete
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit item</ModalHeader>
                <ModalBody>

                    <Form onSubmit={e => e.preventDefault()}>
                        <FormGroup>
                            <Label for="exampleTask">Task</Label>
                            <Input value={task}
                                   onChange={e => setTask(e.target.value)}
                                   name="task" id="exampleTask"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Description</Label>
                            <Input value={description}
                                   onChange={e => setDescription(e.target.value)}
                                   type="textarea" name="text"
                                   id="exampleText"/>
                        </FormGroup>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            toggle();
                            editTodo({index, item, task, description});
                        }}
                    >
                        Edit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </ListGroupItem>
    );
};

export default ListItem;
