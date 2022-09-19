import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Header from "../components/Header";
import StepsForm from "../components/StepsForm";
import { config } from "../Config.js";
import AuthContext, { AuthProvider } from "../contex/AuthContex";
import LoginPage from "../components/LoginPage/LoginPage";
import PrivateRoute from "../utils/PrivateRoute";
import Register from "../components/RegisterPage/RegisterPage";
import LeftMenu from "../components/LeftMenu/LeftMenu";
import FileDownloadPage from "../components/FileDownloadPage/FileDownloadPage";
import SftpConnectionForm from "../components/SftpConnectionForm/SftpConnectionForm";
import KeyUploadForm from "../components/KeyUploadForm/KeyUploadForm";
import SuccessPage from "../components/SuccessPage/SuccessPage";
import RestrictedAccessPage from "../components/RestrictedAccessPage/RestrictedAccessPage";

import "./App.css";

const App = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className="app">
                    <Header />
                    <Container>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                mt: "50px",
                                justifyContent: "center",
                            }}
                >
                    {user.admin ? <LeftMenu /> : null}
                           
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                    padding: "0px 30px",
                                }}
                            >
                                <Routes>
                                    <Route
                                        path="/file-upload"
                                        element={<PrivateRoute Component={StepsForm} />}
                                    />
                                    <Route
                                        path="/sftp-connection"
                                        element={<PrivateRoute Component={SftpConnectionForm} />}
                                    />
                                    <Route
                                        path="/browse-folders"
                                        element={<PrivateRoute Component={FileDownloadPage} />}
                                    />
                                    <Route
                                        path="/key-upload"
                                        element={<PrivateRoute Component={KeyUploadForm} />}
                                    />
                                    <Route
                                        path="/success"
                                        element={<PrivateRoute Component={SuccessPage} />}
                                    />

                                    <Route element={<LoginPage />} path="/login" />
                                    <Route element={<Register />} path="/register" />
                                </Routes>
                            </Box>
                        </Box>
                    </Container>                
        </div>
    );
}

export default App;
