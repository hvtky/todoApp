// @flow
import React, {useEffect, useState} from 'react';
import {getTodos, addTodo, updateTodo} from "../services/todoService.js";
import {InputTodo} from './InputTodo.jsx';
import {TodoList} from './TodoList.jsx';

export function TodoLogic() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState({});
    //getAllTodos
    useEffect(() =>{
        const fetchTodos = async () =>{
            const response = await getTodos();
            setTodos(response);
        }
        fetchTodos();
    }, []);
    //addTodo
    const addNewTodo = async (title) =>{
        const newTodo = await addTodo(title);
        setTodos([...todos, newTodo]);
    };
    //updateTodo
    const upTodo = async (update) => {
        const updatedTodo = await updateTodo(update.id, update);
        console.log(updatedTodo)
        setTodos(todos.map(todo => (todo._id === update.id ? update : todo)));
        setEditingTodo({});
    };
    const getUpdate = (e) =>{
        setEditingTodo(e)
    }
    //deleteTodo
    const deleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo._id!== id));
    };
    return (
        <div className='w-[1000px] h-[calc(100% - 140px)]'>
            <InputTodo
                addTodo={addNewTodo}
                upTodo={upTodo}
                editingTodo={editingTodo}
            />
            <TodoList
                todos={todos}
                setTodos={setTodos}
                getUpdate={getUpdate}
                deleteTodo={deleteTodo}
            />
        </div>
    );
};