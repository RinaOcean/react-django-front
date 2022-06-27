import { Stepper, Typography, Step, StepLabel, Box, Card, CardContent } from '@material-ui/core';
import { Form, Formik, useFormik } from 'formik';
import React, { useState, createContext } from 'react';
import axios from 'axios';
import styles from './FormikStepper.module.css';

export const FormContext = createContext();

const FormikStepper = ({children, ...props}) => {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [completed, setCompleted] = useState(false)
  const currentChild = childrenArray[step]
 
 
  function isLastStep () {
    return step === childrenArray.length - 1
  }

const submitHandler = async (e) => {
  e.preventDefault()
  if(step === childrenArray.length - 1) {
        console.log("ok");
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log("from submitHandler inFormikStepper====>>>>> ", formProps );

        try {
          const res = await axios.post("http://127.0.0.1:8000/sftp_upload/", formData)
          console.log(res);
          setCompleted(true)
    
        } catch (e) {
          console.log(e);
        }
      }else{
        setStep(s => s+1)
      }
     }

return (
    <FormContext.Provider value={{step, setStep, selectedFile, setSelectedFile, selectedKey, setSelectedKey}} >
            
      <Formik {...props}>
        <Form className={styles.form} autoComplete='off' onSubmit={(e) => submitHandler(e)}  encType="multipart/form-data">
        {/* stepper */}
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={step} alternativeLabel>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}  >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>       
        </Box>
          
          {/* piece of form */}
            
           <Card>
             <CardContent>
                {!completed? currentChild : <p>Successfully Uploaded</p>} 
             </CardContent>
           </Card>
         
           
           {/* Buttons */}
           <div className={styles.buttonsWrapper}>
             <button
                type="button" 
                className={step>0 ? styles.button : styles.buttonInvis}
                onClick={()=>setStep(s=>s-1)}         
              >
               back
              </button>
              <button
                 className={!selectedFile && !selectedKey? styles.buttonNotActive : styles.buttonActive}                
                 type="submit"                        
              >
                {isLastStep()? 'submit' : 'next'}
              </button>
            </div> 
        </Form>       
      </Formik>
    </FormContext.Provider>
  )
}
export default FormikStepper