import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { addUser, editUser, getRoles } from "../services/data-logic";
import { Button } from "react-bootstrap";

interface Props {
    user: any
}

const UserForm: React.FC<Props> = ({ user = null }) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({id: '', email: '', full_name: '', roles: []});
    const [isSaving, setSaving] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [roles, setRoles] = useState(Array<any>);
    const fetchRolesData = async () => {
        setLoading(true);
        const roleList = await getRoles();
        setLoading(false);
        if (roleList) setRoles(roleList);
    };
    const [formData, setFormData] = useState({
        id: 0,
        email: '',
        full_name: '',
        roles: []
    });
    const [selectedRoles, setSelectedRoles] = useState(Array<string>);
    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setCurrentUser(JSON.parse(JSON.stringify(user)));
            setFormData(user);
            let userRoles = new Array(0);
            userRoles.splice(0, 1);
            user.roles.forEach((r:any) => {
                userRoles.push(`${r.id}`);
            });
            setSelectedRoles(userRoles);
        }
        const localRoles = localStorage.getItem('roles');
        if (localRoles) {
            setRoles(JSON.parse(localRoles));
        } else {
            fetchRolesData();
        }
    }, []);
    const saveUser = async (user: any) => {
        setSaving(true);
        const newUser = await addUser(user);
        if (newUser) navigate("/user/view/" + newUser.id);
        setSaving(false);
    };
    const updateUser = async (user: any) => {
        setSaving(true);
        const updatedUser = await editUser(user);
        setSaving(false);
    };
    const onFormSubmit = (e:any) => {
        e.preventDefault();
        if (user && Object.keys(user).length > 0) {
            updateUser({id: user.id, email: formData.email, full_name: formData.full_name, roles: selectedRoles})
        } else {
            saveUser({email: formData.email, full_name: formData.full_name, roles: selectedRoles})
        }
    };
    const onChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const onCheck = (e:any) => {
        const { name, value, checked } = e.target;
        let userRoles = selectedRoles;
        let currentIndex = userRoles.indexOf(`${value}`);
        if (!checked &&  currentIndex >= 0) {
            userRoles.splice(currentIndex, 1);
        } else {
            if (currentIndex < 0) userRoles.push(`${value}`);
        }
        setSelectedRoles(userRoles);
    }
    return ( 
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={onChange} type="email" placeholder="Email" name="email" defaultValue={currentUser?.email} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="full_name">
                <Form.Label>full_name</Form.Label>
                <Form.Control onChange={onChange} type="text" placeholder="Full name" name="full_name" defaultValue={currentUser?.full_name} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Roles</Form.Label>
                {isLoading ? <div><Spinner animation="border" variant="primary" /></div> : roles.map(( role, index ) => {
                    let selected = false;
                    if (currentUser) selected = currentUser?.roles?.filter((r:any) => r.id == role.id).length > 0;
                    return selected ? <Form.Check onChange={onCheck} name={`roles[${index}]`} defaultChecked type="checkbox" id={`role-${role.id}`} key={`role-${role.id}`} value={role.id} label={role.name} /> : <Form.Check onChange={onCheck} name={`roles[${index}]`} type="checkbox" id={`role-${role.id}`} key={`role-${role.id}`} value={role.id} label={role.name} />;
                })}
            </Form.Group>
            <Form.Group>
                <Button type="submit" disabled={isLoading || isSaving} >{isSaving ? 'Loading…' : 'Submit'}</Button>
            </Form.Group>
        </Form>
    );
}

export default UserForm;