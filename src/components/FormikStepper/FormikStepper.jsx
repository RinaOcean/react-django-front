import {
  Stepper,
  Typography,
  Step,
  StepLabel,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState, createContext } from "react";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import { UPLOAD_URL } from "../../utils/Urls";

import styles from "./FormikStepper.module.css";

export const FormContext = createContext();

const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sessionKey, setSessionKey] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const currentChild = childrenArray[step];
  const currentStep = step;

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setActiveBtn(false);
    if (step === 0) {
      const file = new FormData();
      file.append("file", selectedFile);
      try {
        const res = await axios.post(`${UPLOAD_URL}file_upload/`, file);
        
        const sessKey = res.data?.session_key;
        localStorage.setItem("sessionKey", sessKey);
        setSessionKey(sessKey);
        setIsFailed(false);
        setStep((s) => s + 1);
      } catch (e) {
        console.log(e);
        setErrorMessage(e.response.data.errors.file[0]);
        setIsFailed(true);
      }
    } else if (step === childrenArray.length - 1) {
      const formData = new FormData(e.target);
      formData.append("session_key", sessionKey);
      try {
        const res = await axios.post(`${UPLOAD_URL}sftp_upload/`, formData);
        setCompleted(true);
        setIsFailed(false);
        setStep((s) => s + 1);
      } catch (e) {
        console.log("ERROR=====>", e);
        let errMsg = '';
        if (e.response.data.errors.key) {
            errMsg = e.response.data.errors.key[0];
        } else if (e.response.data.errors.host_name) {
            errMsg = e.response.data.errors.host_name[0];
        } else if (e.response.data.errors.username) {
            errMsg = e.response.data.errors.username[0];
        } else if (e.response.data.errors.port) {
            errMsg = e.response.data.errors.port[0];
        } else if (e.response.data.errors.password) {
            errMsg = e.response.data.errors.password[0];
        } else if (e.response.data.errors.key_passphrase) {
            errMsg = e.response.data.errors.key_passphrase[0];
        }
        setErrorMessage( errMsg );
        setIsFailed(true);
      }
    }
  };

  const isStepFailed = (step) => {
    if (isFailed) {
      return step === currentStep;
    }
  };

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        isFailed,
        setIsFailed,
        errorMessage,
        setErrorMessage,
        selectedFile,
        setSelectedFile,
        sessionKey,
        setSessionKey,
        selectedKey,
        setSelectedKey,
        activeBtn,
        setActiveBtn,
      }}
    >
      <Formik {...props}>
        <Form
          className={styles.form}
          autoComplete="off"
          onSubmit={(e) => submitHandler(e)}
          encType="multipart/form-data"
        >
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={step}>
              {childrenArray.map((child, index) => {
                const labelProps = {};
                if (isStepFailed(index)) {
                  labelProps.optional = (
                    <Typography variant="caption" color="error">
                      {errorMessage}
                    </Typography>
                  );

                  labelProps.error = true;
                }

                return (
                  <Step key={child.props.label}>
                    <StepLabel {...labelProps}>{child.props.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          {/* piece of form */}

          <Card>
            <CardContent>
              {!completed ? (
                currentChild
              ) : (
                <div className={styles.messageWrapper}>
                  <DoneIcon className={styles.successIcon} />
                  <p className={styles.successMessage}>
                    File is successfully uploaded
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Buttons */}
          {!completed ? (
            <div className={styles.buttonsWrapper}>
              <button
                type="button"
                className={step > 0 ? styles.button : styles.buttonInvis}
                onClick={() => {
                  setStep((s) => s - 1);
                  setActiveBtn(true);
                  // setSelectedFile(null);
                }}
              >
                back
              </button>
              <button
                className={
                  !activeBtn ? styles.buttonNotActive : styles.buttonActive
                }
                type="submit"
              >
                {isLastStep() ? "submit" : "next"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.buttonUploadMore}
              onClick={() => {
                setStep(0);
                setSelectedFile(null);
                setCompleted(false);
              }}
            >
              UploadMore
            </button>
          )}
        </Form>
      </Formik>
    </FormContext.Provider>
  );
};
export default FormikStepper;
