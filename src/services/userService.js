import axios from 'axios';

const registerNewUser = (email, phone, password, username) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email,
        phone,
        password,
        username,
    });
};

const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8080/api/v1/login', { valueLogin, password });
};

export { registerNewUser, loginUser };
