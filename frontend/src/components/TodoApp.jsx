// @flow
import React, {useEffect, useState} from 'react';
import {Header}  from './Header.jsx';
import {TodoLogic} from './TodoLogic.jsx';

export function TodoApp() {
    return (
        <div className='w-full h-[100vh] p-5 mt-4 flex flex-col items-center'>
            <Header/>
            <TodoLogic/>
        </div>
    );
};