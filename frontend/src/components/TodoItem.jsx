// @flow
import React, {useEffect, useState} from 'react';
import {updateTodo, deleteTodo} from "../services/todoService";
import {Checkbox, Label, ListGroup} from "flowbite-react";
import {FiEdit2} from "react-icons/fi";
import {MdDelete} from "react-icons/md";

export function TodoItem({todo, id, complete, setTodos, todos, getUpdate}) {
    console.log("todoItem re-render")
    const [isChecked, setIsChecked] = useState(complete);
    const [isComplete, setIsComplete] = useState(complete);
    //gach chan check box
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleCompleteChange = () => {
        setIsComplete(!isComplete);
    };
    const handleCLick = (e) => {
        const label = e.querySelector('label')
        label.classList.add(isComplete ? 'no-underline': 'line-through');
        handleCheckboxChange()
        handleCompleteChange()
    }
    const toggleComplete = async (e) => {
        const tag = (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL')? e.target.parentNode : e.target;
        if(e.target.tagName === 'DIV'){
            handleCLick(e.target)
        }else if(e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL'){
            handleCLick(e.target.parentNode)
        }
        const updatedTodo = {
            _id: tag.id,
            todo: tag.children[1].innerHTML,
            complete: `${JSON.stringify(!isComplete)}`,
        }
        await updateTodo(updatedTodo._id, {todo: updatedTodo.todo, complete: updatedTodo.complete});
        setTodos(todos.map(t => t.id === tag.id? updatedTodo : t));
    };
    //xoa
    const removeTodo = async () => {
        console.log(id)
        await deleteTodo(id);
        setTodos(todos.filter(t => t._id!== id));
    }
    //sua
    const handleEdit = async (e) => {
        getUpdate({todo: todo, id: id, complete: JSON.stringify(complete)})
    }

    return (
        <ListGroup.Item>
            <div className='w-full flex items-center justify-between'>
                <div className="w-[800px] flex items-center gap-2"
                     id={`${id}`}
                     onClick={toggleComplete}>
                    <Checkbox className='size-5'
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                    />
                    <Label
                        className={`${isComplete? 'line-through': 'no-underline'} text-xl text-ellipsis overflow-hidden text-nowrap` }
                    >
                        {todo}
                    </Label>
                </div>
                <div className='w-[60px] flex justify-between'>
                    <FiEdit2 className='size-5' onClick={(e) => {handleEdit(e)}}/>
                    <MdDelete className='size-5' onClick={removeTodo}/>
                </div>
            </div>
        </ListGroup.Item>
    );
};