import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserForm from "../components/UserForm";
const AddUser = () => {
    return (
        <div>
            <Container fluid>
                <Row className="px-0">
                    <Col><h3>Add User</h3></Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <UserForm user={null} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
 
export default AddUser;