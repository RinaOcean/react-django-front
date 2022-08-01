import React, { useContext } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Field, Formik, Form, useFormik } from 'formik';
import { Button, Card, CardContent } from '@mui/material';
import UploadFile from '../Forms/UploadFile';
import UploadDetails from '../Forms/UploadDetails/UploadDetails';
import FormikStepper from '../FormikStepper/FormikStepper';

import styles from './StepsForm.module.css';
import { useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useEffect } from 'react';

const StepsForm = () => {

  const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
  }, []);  
 
  return (
  
       <FormikStepper >
          <UploadFile label="Select file"/> 
          <UploadDetails label="Upload details"/>     
       </FormikStepper>   
   
  )
};

export default StepsForm;