// @flow
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {register} from '../services/authService';
import {Button, Card, Checkbox, Label, TextInput} from "flowbite-react";

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatch, setIsMatch] = useState(true);

    const navigate = useNavigate();
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPasswords(e.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswords(password, e.target.value);
    };

    const checkPasswords = (password, confirmPassword) => {
        setIsMatch(password === confirmPassword);
    };

    const handleSubmit = async (e) => {
        console.log('register')
        e.preventDefault();
        try {
            const result = await register(name, email, password);
            console.log(result);
            if (result) {
                navigate('/login');
            }
        } catch (error) {
            alert('Registration failed');
        }
    }
    const handleLogin = async (e) => {
        navigate('/');
    }
    return (
        <div className='w-full h-[100vh] flex justify-center items-center p-5'>
            <Card className="w-[500px] max-w-2xl">
                <h2 className='uppercase text-3xl text-center text-cyan-700 underline'>todo app</h2>
                <span className='text-gray-900 text-2xl'>Create an account</span>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Your name"/>
                        </div>
                        <TextInput id="name" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email"/>
                        </div>
                        <TextInput id="email1" type="email" placeholder="name@flowbite.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password"/>
                        </div>
                        <TextInput id="password1" type="password" value={password} onChange={handlePasswordChange} required/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="Confirm password"/>
                        </div>
                        <TextInput id="password2" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange } required/>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember"/>
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    {!isMatch && <p style={{ color: 'red' }}>Mật khẩu không khớp!</p>}
                    <Button disabled={!isMatch} type="submit">Register</Button>
                    <span className='text-gray-400 text-sm'>Already have an account?<span
                        className='cursor-pointer text-blue-600 hover:text-blue-400'
                        onClick={handleLogin}> Login here</span></span>
                </form>
            </Card>
        </div>
    );
};