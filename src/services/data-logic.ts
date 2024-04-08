import { fetchUsers, fetchUser, createUser, updateUser, fetchRoles } from "./data-api";

export const getRoles = async () => {
    try {
        const response = await fetchRoles();
        return response.data;
    } catch (error) {
        
    }
};

export const getUsers = async (role_id = '') => {
    try {
        const response = await fetchUsers(role_id);
        return response.data;
    } catch (error) {
        
    }
};

export const getUser = async (id = '') => {
    try {
        const response = await fetchUser(id);
        return response.data;
    } catch (error) {
        
    }
};

export const addUser = async (user:any) => {
    try {
        const response = await createUser(user);
        return response.data;
    } catch (error) {
        
    }
};

export const editUser = async (user:any) => {
    try {
        const response = await updateUser(user);
        return response.data;
    } catch (error) {
        
    }
};