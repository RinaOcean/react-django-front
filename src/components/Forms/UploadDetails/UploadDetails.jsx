import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from "yup";
import styles from './UploadDetails.module.css'

import {FormContext} from "../../FormikStepper/FormikStepper";
import { useEffect } from 'react';
import { PORT, UPLOAD_HOST_NAME, UPLOAD_PORT, UPLOAD_USER_NAME, USER_NAME } from '../../../utils/SftpVariables';


const Input = styled('input')({
  display: 'none',
});

const UploadDetails = () => {
  const {
      step,
      setStep,
      selectedFile,
      setSelectedFile,
      sessionKey,
      setSessionKey,
      setIsFailed,
      selectedKey,
      setSelectedKey,
      activeBtn,
      setActiveBtn,
  } = useContext(FormContext);
  const inputRef = React.useRef(null);

  const ValidationSchema = yup.object().shape({
    host_name: yup.string()
      .max(20, 'Too Long!')
      .required('Required'),
    username: yup.string()
      .max(20, 'Too Long!')
      .required('Required'),
    password: yup.string()
      .max(20, 'Too Long!'),
    key: yup.mixed().test('fileType', "Only .pem extension is allowed ", value => ["pem", ""].includes(value?.type)),
    upload_path: yup.string()
      .max(100, 'Too Long!')
      .required('Required'),
  });
  
  const formik = useFormik({
      enableReinitialize: false,
      // validationSchema: ValidationSchema,
      initialValues: {
          host_name: UPLOAD_HOST_NAME,
          port: UPLOAD_PORT,
          username: UPLOAD_USER_NAME,
          password: "",
          ssh_check: false,
          key: null,
          key_passphrase: "",
          upload_path: "/inbox/",
      },
  });

  const handleChange = function(e) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {         
      const keyFile = new FormData();
      keyFile.append("key", e.target.files[0]);     
      formik.setFieldValue('key', e.target.files[0]);
      setIsFailed(false);
      setSelectedKey(true)       
      setActiveBtn(true);  
    }  
  };

  // triggers the input when the button is clicked
const onButtonClick = () => {
  inputRef.current.click();
};
 
  return (
      <>
          <div className={styles.inputWrapper}>
              <p>Selected file: {selectedFile.name}</p>
          </div>

          <div className={styles.inputWrapper}>
              <label htmlFor="hostName">SFTP host name</label>
              <input
                  className={formik.errors.host_name ? styles.inputFieldError : styles.inputField}
                  name="host_name"
                  id="hostName"
                  value={formik.values.host_name}
                  onChange={formik.handleChange}
              />
              {formik.errors && formik.touched ? (
                  <div className={styles.errorMessage}>{formik.errors.host_name}</div>
              ) : null}
          </div>

          <div className={styles.inputWrapper}>
              <label htmlFor="port">SFTP port</label>
              <input
                  className={formik.errors.host_port ? styles.inputFieldError : styles.inputField}
                  name="port"
                  id="port"
                  value={formik.values.port}
                  onChange={formik.handleChange}
              />
              {formik.errors && formik.touched ? (
                  <div className={styles.errorMessage}>{formik.errors.host_port}</div>
              ) : null}
          </div>

          <div className={styles.inputWrapper}>
              <label htmlFor="username">SFTP username</label>
              <input
                  className={formik.errors.username ? styles.inputFieldError : styles.inputField}
                  name="username"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
              />
              {formik.errors && formik.touched ? (
                  <div className={styles.errorMessage}>{formik.errors.username}</div>
              ) : null}
          </div>

          <div className={styles.inputWrapper}>
              <label htmlFor="password">SFTP password</label>
              <input
                  className={formik.errors.password ? styles.inputFieldError : styles.inputField}
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
              />
              {formik.errors && formik.touched ? (
                  <div className={styles.errorMessage}>{formik.errors.password}</div>
              ) : null}
          </div>

          <div className={styles.sshCheckbox}>
            <input type="checkbox" name="ssh_check" onChange={formik.handleChange}/>
            <label>SSH file</label>
          </div>
          {/* {formik.values.ssh_check === true ? (
            <> */}
                <div className={formik.values.ssh_check === true ? styles.inputWrapper : styles.inputWrapperDisabled}>
                    <label htmlFor="key">Private SSH file, please use only OpenSSH keys</label>
                    <input
                        ref={inputRef}
                        type="file"
                        id="key"
                        name="key"
                        className={styles.keyUpload}
                        onChange={handleChange}                        
                    />
                {formik.errors && formik.touched ? (
                    <div className={styles.errorMessage}>{formik.errors.key}</div>
                ) : null}
                <div>
                    <button type="button" onClick={onButtonClick} disabled={formik.values.ssh_check === true ? false : true}>
                        Browse
                    </button>
                    {!selectedKey ? (
                        <span className={styles.selectedKey}>file is not selected</span>
                    ) : (
                        <span className={styles.selectedKey}>{formik.values.key?.name}</span>
                    )}
                </div>
            </div>

          <div className={formik.values.ssh_check === true ? styles.inputWrapper : styles.inputWrapperDisabled}>
              <label htmlFor="key_passphrase">SSH key passphrase</label>
              <input
                  className={
                      formik.errors.key_passphrase ? styles.inputFieldError : styles.inputField
                  }
                  type="text"
                  name="key_passphrase"
                  id="key_passphrase"
                  value={formik.values.key_passphrase}
                  required
                  disabled={formik.values.ssh_check === true ? false : true}
                  onChange={formik.handleChange}
              />
              {formik.errors && formik.touched ? (
                  <div className={styles.errorMessage}>{formik.errors.key_passphrase}</div>
              ) : null}
          </div>
            {/* </>  ) : null}   */}

          <div className={styles.inputWrapper}>
              <label htmlFor="upload_path">Upload path</label>
              <input
                  className={formik.errors.upload_path ? styles.inputFieldError : styles.inputField}
                  name="upload_path"
                  id="upload_path"
                  value={formik.values.upload_path}
                  onChange={formik.handleChange}
              />
              {formik.errors && formik.touched ? (
                  <div className={styles.errorMessage}>{formik.errors.upload_path}</div>
              ) : null}
          </div>
      </>
  );
};

export default UploadDetails;