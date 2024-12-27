import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {TodoApp} from "./components/TodoApp";

function App() {
    const isAuthenticated = localStorage.getItem('token');
    const [isToken, setIsToken] = useState(false);
    useEffect(() => {
        if (isToken) {
            window.location.reload();
        }
    }, [isToken]);
    return(
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated != null? <TodoApp/> : <Navigate to="/login"/>}></Route>
                <Route path="/login" element={<Login setIsToken={setIsToken}/>}/>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
