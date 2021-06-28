import React, {useContext, useState} from 'react';
import {MyContext} from "../context/context";
import {Button, Container, Form, Modal, ModalBody, ModalHeader} from "reactstrap";

const Account = () => {
    const {handleAccount, handleLogout, error, account} = useContext(MyContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <>
            <Container>
                {
                    account ?
                        <div className="float-end">
                            {account}
                            <Button className="ms-2" color="secondary" onClick={handleLogout}>Logout</Button>
                        </div>
                        :
                        <div className="float-end">
                            <Button color="secondary" onClick={() => toggle()}>Login</Button>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Login</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={(e) => e.preventDefault()}>
                                        <label htmlFor="validationEmail" className="form-label">Email</label>
                                        <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend"><i
                                    className="bi bi-at"/></span>
                                            <input onChange={(e) => setEmail(e.target.value)}
                                                   type="email"
                                                   className="form-control"
                                                   id="validationEmail"
                                                   aria-describedby="inputGroupPrepend" required/>
                                        </div>
                                        <label htmlFor="validationPassword" className="mt-2 form-label">Password</label>
                                        <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend"><i
                                    className="bi bi-shield-lock"/></span>
                                            <input onChange={(e) => setPassword(e.target.value)} type="password"
                                                   className="form-control"
                                                   id="validationPassword"
                                                   aria-describedby="inputGroupPrepend" required/>
                                        </div>
                                        <Button onClick={() => handleAccount({email, password})} className="mt-2">Sign
                                            in</Button>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </div>
                }
                <div>{error}</div>
            </Container>
        </>
    );
};

export default Account;
