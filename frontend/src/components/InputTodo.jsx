// @flow
import React, {useEffect, useState} from 'react';

export function InputTodo({addTodo, upTodo, editingTodo}) {
    const [title, setTitle] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.entries(editingTodo).length > 0) {
            e.target.querySelector('div > input').value = '';
            if(title !== ''){upTodo({...editingTodo, todo: title});}
        }
        else {
            addTodo(title.trim());
        }
        setTitle('');
    };
    useEffect(() => {
        if (editingTodo && editingTodo.todo) {
            setTitle(editingTodo.todo);
        } else {
            setTitle(''); // Reset title if not editing
        }
    }, [editingTodo]);
    return (
        <div className='w-full h-[70px]'>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input type="text" id="todoInput"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Input todo"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           required/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                    </button>
                </div>
            </form>
        </div>
    );
};