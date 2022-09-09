import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { FileDownload } from "@mui/icons-material";
import { Form, Formik, useFormik } from "formik";
import { Box, Card, CardContent } from "@mui/material";
import axios from "axios";
import { HOST_NAME, PORT, USER_NAME } from "../../utils/SftpVariables";
import { useGetRootFolderQuery } from "../../services/api/rootFolder";
import { DOWNLOAD_FILE, GET_ROOT_FOLDER_URL, UPLOAD_KEY_URL } from "../../utils/Urls";
import FileDownloadPage from "../FileDownloadPage/FileDownloadPage";

import styles from "./KeyUploadForm.module.css";

const KeyUploadForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState();
    const [activeBtn, setActiveBtn] = useState(false);

    const formik = useFormik({
        enableReinitialize: false,
        initialValues: {
            key_file: null,
            key_passphrase: "",
            session_key: location.state,
        },
        onSubmit: async (values) => {
            const formdata = new FormData();
            formdata.append("key_file", values.key_file);
            formdata.append("key_passphrase", values.key_passphrase);
            formdata.append("session_key", values.session_key);
            await axios
                .post(UPLOAD_KEY_URL, formdata)
                .then(function (response) {
                    if (response.status === 200) {
                        navigate("http://127.0.0.1:8000/download_file/");

                        // axios
                        //     .get(DOWNLOAD_FILE)
                        //     .then(function (response) {
                        //         console.log('download', response);
                        //     })
                        //     .catch(function (error) {
                        //         console.log(error);
                        //     });
                    }
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    });

      const handleChange = function (e) {
          e.preventDefault();

          if (e.target.files && e.target.files[0]) {        
              formik.setFieldValue("key_file", e.target.files[0]);              
              setSelectedKey(true);
              setActiveBtn(true);
          }
      };
      const inputRef = React.useRef(null);
      // triggers the input when the button is clicked
      const onButtonClick = () => {
          inputRef.current.click();
      };

    return (
        <Formik>
            <Form className={styles.form} autoComplete="off" onSubmit={formik.handleSubmit}>
                <Box sx={{ width: "100%" }}>
                    <Card>
                        <CardContent>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="key_file">
                                    Private SSH file, please use only OpenSSH keys
                                </label>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    id="key_file"
                                    name="key_file"
                                    className={styles.keyUpload}
                                    onChange={handleChange}
                                />
                                {formik.errors && formik.touched ? (
                                    <div className={styles.errorMessage}>
                                        {formik.errors.key_file}
                                    </div>
                                ) : null}
                                <div>
                                    <button type="button" onClick={onButtonClick}>
                                        Browse
                                    </button>
                                    {!selectedKey ? (
                                        <span className={styles.selectedKey}>
                                            file is not selected
                                        </span>
                                    ) : (
                                        <span className={styles.selectedKey}>
                                            {formik.values.key_file?.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="key_passphrase">Key Passphrase</label>
                                <input
                                    className={
                                        formik.errors.key_passphrase
                                            ? styles.inputFieldError
                                            : styles.inputField
                                    }
                                    type="password"
                                    name="key_passphrase"
                                    id="key_passphrase"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors && formik.touched ? (
                                    <div className={styles.errorMessage}>
                                        {formik.errors.key_passphrase}
                                    </div>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                </Box>
                <button type="submit" disabled={activeBtn ? false : true} className={styles.buttonUploadMore}>
                    Submit
                </button>
            </Form>
        </Formik>
    );
};

export default KeyUploadForm;