import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from 'axios';
import * as yup from "yup";
import {FormContext} from "../../FormikStepper/FormikStepper";
import DoneIcon from '@mui/icons-material/Done';
import styles from "./UploadFile.module.css";

const UploadFile = () => {
  const { step, setStep, selectedFile, setSelectedFile, activeBtn, setActiveBtn, isFailed, setIsFailed, errorMessage, setErrorMessage, } = useContext(FormContext);
  
  const inputRef = React.useRef(null);
  
  const ValidationSchema = yup.object().shape({
    file: yup.mixed().required('File is required')
  })
  
  const formik = useFormik({
  enableReinitialize: false,
  validationSchema: ValidationSchema,
  initialValues: {
      file: selectedFile,
      session_key: '',
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
        setActiveBtn(true)
        setIsFailed(false)
        
      } catch (e) {
        setIsFailed(true);
        setErrorMessage(e.response.data.errors.file[0])
        
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
        const res =  await axios.post("http://127.0.0.1:8000/file_upload/", file)
        console.log(res.data.session_key);
        formik.setFieldValue('file', e.target.files[0]);
        formik.setFieldValue('session_key', res.data.session_key);
        setSelectedFile(file.get('file'))    
        setActiveBtn(true) 
        setIsFailed(false)
      } catch (e) {
        setIsFailed(true);
        setErrorMessage(e.response.data.errors.file[0])
      }      
    }  
  };

  // triggers the input when the button is clicked
const onButtonClick = () => {
  inputRef.current.click();
};

  return (
      <>
        <div className={styles.messageWrapper}>
         {!selectedFile?    
                         
            <p>Please choose .xlsx file with data</p> :
            <> 
            <DoneIcon className={styles.successIcon}/>
            <p className={styles.successMessage}>File {selectedFile?.name} was successfully added</p>
            </>
          }  
        </div>
 
      <div  className={dragActive ? styles.dragNdropWrapperActive : styles.dragNdropWrapper}  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
          <input 
            ref={inputRef}
            type="file"         
            id="file"
            name="file"
            error={formik.errors.file}            
            className={styles.inputFileUpload}
            onChange={handleChange}
          />
          <label id="labelFileUpload" htmlFor="file">
            <div>
              <>                             
                <p>Drag and drop your file here or</p> 
                <button type="button"  className={styles.uploadButton} onClick={onButtonClick}>Browse</button>
              </>               
           
            </div> 
          </label>
        </div>
</>
  );
};

export default UploadFile;