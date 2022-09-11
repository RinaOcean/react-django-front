import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Form, Formik, useFormik } from "formik";
import styles from "./SftpConnectionForm.module.css";
import { useEffect } from "react";
import { HOST_NAME, PORT, USER_NAME } from "../../utils/SftpVariables";
import { Box, Card, CardContent, Stack } from "@mui/material";
import { useGetRootFolderQuery } from "../../services/api/rootFolder";
import axios from "axios";
import { GET_ROOT_FOLDER_URL } from "../../utils/Urls";
import { useNavigate } from "react-router-dom";
import { FileDownload } from "@mui/icons-material";
import FileDownloadPage from "../FileDownloadPage/FileDownloadPage";

const SftpConnectionForm = () => {
    const navigate = useNavigate();  

    const formik = useFormik({
        enableReinitialize: false,
        initialValues: {
            host_name: HOST_NAME,
            port: PORT,
            username: USER_NAME,
            password: "",
        },
        onSubmit: async (values) => {            
            let res = null;
            await axios
                .post(GET_ROOT_FOLDER_URL, values)
                .then(function (response) {   
                    console.log(response);
                    res = response;
                })
                .catch(function (error) {
                    console.log(error);
                });     
            navigate("/browse-folders", { state: res?.data });  
            
        },
    });

    return (
        <Formik>
            <Form className={styles.form} autoComplete="off" onSubmit={formik.handleSubmit}>
                <Box sx={{ width: "100%" }}>
                    <Card>
                        <CardContent>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="hostName">Host name</label>
                                <input
                                    className={
                                        formik.errors.host_name
                                            ? styles.inputFieldError
                                            : styles.inputField
                                    }
                                    name="host_name"
                                    id="hostName"
                                    value={formik.values.host_name}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors && formik.touched ? (
                                    <div className={styles.errorMessage}>
                                        {formik.errors.host_name}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="port">Port</label>
                                <input
                                    className={
                                        formik.errors.port
                                            ? styles.inputFieldError
                                            : styles.inputField
                                    }
                                    name="port"
                                    id="port"
                                    value={formik.values.port}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors && formik.touched ? (
                                    <div className={styles.errorMessage}>{formik.errors.port}</div>
                                ) : null}
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="username">Username</label>
                                <input
                                    className={
                                        formik.errors.username
                                            ? styles.inputFieldError
                                            : styles.inputField
                                    }
                                    name="username"
                                    id="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors && formik.touched ? (
                                    <div className={styles.errorMessage}>
                                        {formik.errors.username}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="password">Password</label>
                                <input
                                    className={
                                        formik.errors.password
                                            ? styles.inputFieldError
                                            : styles.inputField
                                    }
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors && formik.touched ? (
                                    <div className={styles.errorMessage}>
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                </Box>
                <Stack sx={{ marginTop: "30px" }}>
                    <button type="submit" className={styles.buttonUploadMore}>
                        Submit
                    </button>
                </Stack>
            </Form>
        </Formik>
    );
};

export default SftpConnectionForm;
