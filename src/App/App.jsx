import { PublicClientApplication } from "@azure/msal-browser";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";

import StepsForm from "../components/StepsForm";
import { config } from "../Config.js";
import { AuthProvider } from "../contex/AuthContex";
import LoginPage from "../components/LoginPage/LoginPage";
import PrivateRoute from "../utils/PrivateRoute";

import "./App.css";
import Register from "../components/RegisterPage/RegisterPage";

const  App = () => {
    return (
        <div className="app">
            <AuthProvider>
                <Header />
                <Routes>
                    <Route
                        path="/file-upload"
                        element={<PrivateRoute Component={StepsForm} />}
                    />
                    <Route element={<LoginPage />} path="/login" />
                    <Route element={<Register />} path="/register" />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
