import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const processErrorResponse = (error:any) => {
    switch (error?.response?.status) {
        case 500:
        case 422:
        case 400:
            alert(error?.response?.data?.message);
            return null;
            break;
        case 404:
            alert('Record could not be found.');
            return null;
            break;
        default:
            alert('Unknown error occurred, please try again.');
            return null;
            break;
    }
}

export const fetchRoles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/roles`);
        //console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        return processErrorResponse(error);
    }
};

export const fetchUsers = async (role_id = '') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`, {params: {role_id: role_id}});
        //console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return processErrorResponse(error);
    }
};

export const fetchUser = async (id = '') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        //console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return processErrorResponse(error);
    }
};

export const createUser = async (user: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, user);
        //console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        return processErrorResponse(error);
    }
};
export const updateUser = async (user: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, user);
        //console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return processErrorResponse(error);
    }
};