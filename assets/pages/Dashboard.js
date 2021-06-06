import React, {useContext, useState} from 'react';
import {
    Col,
    Container,
    ListGroup,
    Row
} from "reactstrap";
import {MyContext} from "../context/context";
import AddForm from "../components/AddForm";
import ListItem from "../components/ListItem";
import Loading from "../components/Loading";

const Dashboard = () => {
    const {list, loading} = useContext(MyContext);

    return (
        <>
            <Container>
                <Row>
                    <Col lg={6}>
                        <AddForm/>
                    </Col>
                    <Col lg={6}>
                        {
                            loading ?
                                <Loading/>
                                :
                                <ListGroup className="mt-4">
                                    {
                                        list.map((item, index) => {

                                            return (
                                                <ListItem key={item.id} item={item} index={index}/>
                                            )
                                        })
                                    }
                                </ListGroup>
                        }

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
