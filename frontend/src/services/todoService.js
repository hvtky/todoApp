import axios from "axios";

const API_URL = "http://localhost:5002/api/todos";
//headers
const authHeader = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
})
//api
export const getTodos = async () => {
    const res = await axios.get(
        API_URL,{
            params: {
                email: `${localStorage.getItem('email')}`
            },
            headers: authHeader().headers
        }
    );
    return res.data;
}
export const addTodo = async (todo) => {
    const res = await axios.post(
        API_URL, {
            email: localStorage.getItem('email'),
            todo: todo,
            complete: 'false'
        },{
            headers: authHeader().headers
        }
    );
    return res.data;
}
export const updateTodo = async (id, updatedTodo) => {
    const res = await axios.put(
        `${API_URL}/${id}`, {
            email: localStorage.getItem('email'),
            todo: updatedTodo.todo,
            complete: updatedTodo.complete
        },{
            headers: authHeader().headers
        }
    );
    return res.data;
}
export const deleteTodo = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
            headers: authHeader().headers,
            data: {
                email: `${localStorage.getItem('email')}`
            }
        }
    );
    return res.data;
}