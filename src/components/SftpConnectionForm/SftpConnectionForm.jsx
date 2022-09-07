import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import styles from "./SftpConnectionForm.module.css";

// import { FormContext } from "../../FormikStepper/FormikStepper";
import { useEffect } from "react";
import { HOST_NAME, PORT, USER_NAME } from "../../utils/SftpVariables";
import { Box, Card, CardContent } from "@mui/material";
import { useGetRootFolderQuery } from "../../services/api/rootFolder";
import axios from "axios";

const SftpConnectionForm = () => {
    // const {
    //     step,
    //     setStep,
    //     selectedFile,
    //     setSelectedFile,
    //     sessionKey,
    //     setSessionKey,
    //     setIsFailed,
    //     selectedKey,
    //     setSelectedKey,
    //     activeBtn,
    //     setActiveBtn,
    // } = useContext(FormContext);    

    const ValidationSchema = yup.object().shape({
        host_name: yup.string().max(20, "Too Long!").required("Required"),
        username: yup.string().max(20, "Too Long!").required("Required"),
        password: yup.string().max(20, "Too Long!"),
        key: yup
            .mixed()
            .test("fileType", "Only .pem extension is allowed ", (value) =>
                ["pem", ""].includes(value?.type)
            ),
        upload_path: yup.string().max(100, "Too Long!").required("Required"),
    });

    const formik = useFormik({
        enableReinitialize: false,
        // validationSchema: ValidationSchema,
        initialValues: {
            host_name: HOST_NAME,
            port: PORT,
            username: USER_NAME,
            password: "",
        },
        onSubmit: (values) => {
            console.log(values);
            const formdata = new FormData();

            formdata.append("host_name", "192.168.1.91");
            formdata.append("port", 2222);
            formdata.append("username", "tester");
            formdata.append("password", "password");

            // axios
            //     .post("sftp_connection/",values)
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
            //    const { data, isLoading, refetch } = useGetRootFolderQuery(formdata);
        },
    });
  
    // const onButtonClick = () => {
    //     inputRef.current.click();
    // };

    return (
        <Formik>
            <Form
                className={styles.form}
                autoComplete="off"
                onSubmit={formik.handleSubmit}               
            >
                <Box sx={{ width: "100%" }}>
                    <Card>
                        <CardContent>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="hostName">SFTP host name</label>
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
                                <label htmlFor="port">SFTP port</label>
                                <input
                                    className={
                                        formik.errors.host_port
                                            ? styles.inputFieldError
                                            : styles.inputField
                                    }
                                    name="port"
                                    id="port"
                                    value={formik.values.port}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors && formik.touched ? (
                                    <div className={styles.errorMessage}>
                                        {formik.errors.host_port}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="username">SFTP username</label>
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
                                <label htmlFor="password">Private SSH key password</label>
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
                <button
                    type="submit"
                    // className={styles.buttonUploadMore}
                >
                    Submit
                </button>
            </Form>
        </Formik>
    );
};

export default SftpConnectionForm;
