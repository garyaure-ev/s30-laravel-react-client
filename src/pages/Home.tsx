import React, { useEffect, useState } from "react";
import { getRoles, getUsers } from "../services/data-logic";
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LinkButton from "./LinkButton";

const Home = () => {
    const [isLoading, setLoading] = useState(false);
    const [isRolesLoading, setRolesLoading] = useState(false);
    const [users, setUsers] = useState(Array<{ id: number, email: string, full_name: string, roles: Array<any> }>);
    const [roles, setRoles] = useState(Array<{ id: number, name: string }>);
    const fetchRolesData = async () => {
        setRolesLoading(true);
        const roleList = await getRoles();
        setRolesLoading(false);
        if (roleList) {
            setRoles(roleList);
            localStorage.setItem('roles', JSON.stringify(roleList));
        } else {
            localStorage.removeItem('roles');
        }
    };

    const fetchUsersData = async (role_id = '') => {
        setLoading(true);
        const usersList = await getUsers(role_id);
        setLoading(false);
        if (usersList) setUsers(usersList);
    };
    useEffect(() => {
        fetchRolesData();
        fetchUsersData();
    }, []);

    return (
        <div>
            <Container fluid>
                <Row className="px-0">
                    <Col><h3>User List</h3></Col>
                    <Col xs="5" md="4" lg="3" xl="2">
                        <Form>
                        <Form.Select aria-label="Default select example" onChange={(e: any) => fetchUsersData(e.target.value)}>
                            <option value={""}>All</option>
                            {roles.map(({ id, name }) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </Form.Select>
                        </Form>
                    </Col>
                    <Col xs="auto">
                        <LinkButton label="Add User" href={"/user/add/"} variant="primary" />
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ width: '330px'}}>Email</th>
                                    <th>Name</th>
                                    <th style={{ width: '330px', textAlign: 'center' }}>Roles</th>
                                    <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading || isRolesLoading ? (<tr><td colSpan={4}>Loading, please wait...</td></tr>) : (users.map(({ id, email, full_name, roles }) => (
                                    <tr key={id}>
                                        <td>{email}</td>
                                        <td>{full_name}</td>
                                        <td>
                                            {roles.map(({ id, name }) => (
                                                <Badge key={id} bg="secondary" className="mx-1">{name}</Badge>
                                            ))}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <LinkButton label="View" href={`/user/view/${id}`} variant="info" />{' '}
                                            <LinkButton label="Edit" href={`/user/edit/${id}`} variant="warning" />
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;