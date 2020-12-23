import http from '../http-common';

const getAll = () => {
    return http.get('/users');
};

const get = id => {
    return http.get(`/users/${id}`);
};

const create = data => {
    return http.post('/users/add', data);
};

const update = (id, data) => {
    return http.put(`/users/update/${id}`, data);
};

const remove = id => {
    return http.delete(`/users/delete/${id}`);
};

const findById = id => {
    return http.get(`/users?_id=${id}`);
};
const getByUsername = username => {
    return http.delete(`/users/get/${username}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findById,
    getByUsername
};
