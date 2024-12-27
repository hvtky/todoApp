// @flow
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../services/authService';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

export function Login({setIsToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('login')
        e.preventDefault();
        try {
            const token = await login(email, password);
            localStorage.setItem('token', token.token);
            localStorage.setItem('email', email);
            setIsToken(true);
            navigate('/');
        } catch (error) {
            alert('Invalid credentials');
        }
    }
    const handleRegister = async () => {
        navigate('/register');
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center p-5'>
            <Card className="w-[400px] max-w-2xl">
                <h2 className='uppercase text-3xl text-center text-cyan-700 underline'>todo app</h2>
                <span className='text-gray-900 text-2xl'>Login in to your account</span>
                <span className='text-gray-400 text-sm'>Not a member yet?<span className='cursor-pointer text-blue-600 hover:text-blue-400' onClick={handleRegister}> Get started free now!</span></span>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="name@flowbite.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </Card>
        </div>
    );
};