// @flow
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "flowbite-react";
import {RxAvatar} from "react-icons/rx";
import {FaAngleUp, FaAngleDown} from "react-icons/fa6";
import {info} from "../services/authService.js";

export function Header() {
    const [isOpen, setIsOpen] = useState(null);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchInfo = async () =>{
            const response = await info();
            console.log(response)
            setName(response);
        }
        fetchInfo();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login');
    }
    const handleClicks = () => setIsOpen(!isOpen);
    const clsName = () => {
        if(isOpen !== null) return 'animate-custom-spin-down'
        else return null
    }
    return (
        <header className='w-full h-[140px]'>
            <h1 className='text-3xl text-center uppercase w-full h-[40px]'>Todo App</h1>
            <div className='w-full h-[100px] flex justify-end items-center gap-2'>
                <div className="w-52 h-full flex flex-col items-end">
                    <span className='w-[100px] h-[70px]'>
                        <details className="divide-x divide-blue-400">
                            <summary
                                onClick={handleClicks}
                                className='list-none flex items-center gap-2 cursor-pointer'>
                                <span className='w-[50px] text-ellipsis overflow-hidden text-nowrap text-xl'>{name.name || 'Default'}</span>
                                <RxAvatar className='size-6 text-blue-300'/>
                                {isOpen? <FaAngleUp className='animate-custom-spin-up size-5'/>: <FaAngleDown className={`size-5 ${clsName()}`}/>}
                            </summary>
                                <div>
                                    <button className='ml-5 text-[18px] mt-2 underline text-sky-400 hover:text-sky-300' onClick={handleLogout}>Logout</button>
                                </div>
                            </details>
                    </span>
                </div>
            </div>

        </header>
    );
};