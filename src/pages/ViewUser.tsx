import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserDetails from "../components/UserDetails";
import Spinner from 'react-bootstrap/Spinner';
import { getUser } from "../services/data-logic";
import { Link, useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
const ViewUser = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({id: '', email: '', full_name: '', roles: []});
    const fetchUserData = async () => {
        setLoading(true);
        const currentUser = await getUser(id);
        setLoading(false);
        if (currentUser) setUser(currentUser);
    };
    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <div>
            <Container fluid>
                <Row className="px-0">
                    <Col><h3>View User</h3></Col>
                    <Col xs="auto">
                        {user && user.id ? <Nav.Link as={Link} to={"/user/edit/" + user?.id}>Edit</Nav.Link> : <></>}
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        {isLoading ? <div><Spinner animation="border" variant="primary" /></div> : <UserDetails user={user} />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
 
export default ViewUser;