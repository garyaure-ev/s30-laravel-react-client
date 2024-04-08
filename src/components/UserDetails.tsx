import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Badge } from "react-bootstrap";

interface Props {
    user: any
}

const UserDetails: React.FC<Props> = ({ user = null }) => {
    const navigate = useNavigate();
    useEffect(() => {

    }, []);
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th style={{ width: '150px' }}>Property</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Email</td>
                    <td>{user?.email}</td>
                </tr>
                <tr>
                    <td>Fullname</td>
                    <td>{user?.full_name}</td>
                </tr>
                <tr>
                    <td>Roles</td>
                    <td>
                    {user?.roles.map((role:any) => (
                        <Badge key={role.id} bg="secondary" className="mx-1">{role.name}</Badge>
                    ))}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default UserDetails;