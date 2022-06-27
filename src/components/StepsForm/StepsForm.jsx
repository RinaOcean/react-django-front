import React, { useContext } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Field, Formik, Form, useFormik } from 'formik';
import { Button, Card, CardContent } from '@mui/material';

import styles from './StepsForm.module.css'


import UploadFile from '../Forms/UploadFile';

import UploadDetails from '../Forms/UploadDetails/UploadDetails';
import FormikStepper from '../FormikStepper/FormikStepper';

const StepsForm = () => {
 
  return (
  
       <FormikStepper >
          <UploadFile label="Select file"/> 
          <UploadDetails label="Upload details"/>     
       </FormikStepper>
    
   
  )
};

export default StepsForm;