import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={ <Register /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/" element={ <Home /> } />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}
