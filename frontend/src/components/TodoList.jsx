// @flow
import React, {useEffect, useState} from 'react';
import {TodoItem} from './TodoItem';
import {ListGroup} from "flowbite-react";

export function TodoList({todos, setTodos, getUpdate, deleteTodo}) {
    console.log('TodoList re-render')
    return (
        <div className="flex justify-center">
            <ListGroup className="w-full h-[500px] overflow-y-auto">
                {todos.length > 0? (
                    todos.map((todo) => {
                        return <TodoItem key={todo._id}
                                         todo={todo.todo}
                                         id={todo._id}
                                         complete={JSON.parse(todo.complete)}
                                         setTodos={setTodos} todos={todos}
                                         getUpdate={getUpdate}
                                         deleteTodo={deleteTodo}
                        />;
                    })
                ): (
                    <div></div>
                )}
            </ListGroup>
        </div>
    );
};