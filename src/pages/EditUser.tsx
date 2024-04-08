import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserForm from "../components/UserForm";
import Spinner from 'react-bootstrap/Spinner';
import { getUser } from "../services/data-logic";
import { useParams } from "react-router-dom";
const EditUser = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState(Array<any>);
    const fetchUserData = async () => {
        setLoading(true);
        const user = await getUser(id);
        setLoading(false);
        if (user) setUser(user);
    };
    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <div>
            <Container fluid>
                <Row className="px-0">
                    <Col><h3>Edit User</h3></Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        {isLoading ? <div><Spinner animation="border" variant="primary" /></div> : <UserForm user={user} />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
 
export default EditUser;