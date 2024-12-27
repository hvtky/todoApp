import axios from "axios";

const API_URL = 'http://localhost:5002/api/auth';

const authHeader = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
})

export const login = async (email, password) =>{
    const res = await axios.post(`${API_URL}/login`, {email, password});
    return await res.data;
}
export const register = async (name, email, password) =>{
    const res = await axios.post(`${API_URL}/register`, {name: name, email: email, password: password});
    return await res.data;
}
export const info = async() =>{
    const res = await axios.get(`${API_URL}/info`,
        {
            params: { email: `${localStorage.getItem('email')}` },
            headers: authHeader().headers
        },
    );
    return await res.data;
}