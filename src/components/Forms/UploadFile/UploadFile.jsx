import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from 'axios';
import * as yup from "yup";
import {FormContext} from "../../FormikStepper/FormikStepper";
import { Card, CardContent } from '@mui/material';
import styles from "./UploadFile.module.css";

const UploadFile = () => {
  // const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
  const { step, setStep, selectedFile, setSelectedFile } = useContext(FormContext);
  
  const inputRef = React.useRef(null);
  
  const ValidationSchema = yup.object().shape({
    file: yup.mixed().required('File is required'),
  })
  
  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  const formik = useFormik({
  enableReinitialize: false,
  validationSchema: ValidationSchema,
  initialValues: {
      file: selectedFile,
  }
});

  const [dragActive, setDragActive] = React.useState(false);
  
  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();   
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = async function(e) {  
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {       
      const file = new FormData();
      file.append("file", e.dataTransfer.files[0]);     
    
      try {
        const res = await axios.post("http://127.0.0.1:8000/file_upload/", file)
        formik.setFieldValue('file', e.dataTransfer.files[0]);
        setSelectedFile(file.get('file'))     
      } catch (e) {
        console.log(e);
      }      
    }  
  };

  // triggers when file is selected with click
  const handleChange = async function(e) {
    e.preventDefault();
    if (e.target.files &&e.target.files[0]) {       
      const file = new FormData();
      file.append("file", e.target.files[0]);     
      formik.setFieldValue('file', e.target.files[0]);
      try {
        const res = await axios.post("http://127.0.0.1:8000/file_upload/", file)
        formik.setFieldValue('file', e.target.files[0]);
        setSelectedFile(file.get('file'))     
      } catch (e) {
        console.log(e);
      }      
    }  
  };

  // triggers the input when the button is clicked
const onButtonClick = () => {
  inputRef.current.click();
};


  return (
    
      <div  className={dragActive ? styles.dragNdropWrapperActive : styles.dragNdropWrapper}  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
          <input 
            ref={inputRef}
            type="file"         
            id="file"
            name="file"
            className={styles.inputFileUpload}
            onChange={handleChange}
          />
          <label id="labelFileUpload" htmlFor="file">
            <div>
              <> 
            {!selectedFile?                  
                <p>Drag and drop your file here or</p> :
                <p>File {selectedFile?.name} was successfully added</p>
             }   
                <button type="button"  className={styles.uploadButton} onClick={onButtonClick}>Browse</button>
              </>               
           
            </div> 
          </label>
        </div>

  );
};

export default UploadFile;