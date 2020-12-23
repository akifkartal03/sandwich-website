import http from '../http-common';

const getAll = () => {
    return http.get('/recipes');
};
const getCategories = () => {
    return http.get('/categories');
};

const get = id => {
    return http.get(`/recipes/${id}`);
};

const create = data => {
    return http.post('/recipes/add', data);
};

const update = (id, data) => {
    return http.put(`/recipes/update/${id}`, data);
};

const remove = id => {
    return http.delete(`/recipes/delete/${id}`);
};

const findById = id => {
    return http.get(`/recipes?_id=${id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findById,
    getCategories
};
