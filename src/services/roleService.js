import axios from '../setup/axios';

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles]);
};

const fetchAllRoles = (page, limit) => {
    if (page && limit) {
        return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
    }
    return axios.get('/api/v1/role/read');
};

const deleteRole = (role) => {
    return axios.delete('/api/v1/role/delete', { data: { id: role.id } });
};
const updateRole = (roleData) => {
    return axios.put('/api/v1/role/update', { ...roleData });
};

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`);
};

const assignRolesToGroup = (data) => {
    return axios.post('/api/v1/role/assign-to-group', { data });
};

export { createRoles, fetchAllRoles, deleteRole, updateRole, fetchRolesByGroup, assignRolesToGroup };
