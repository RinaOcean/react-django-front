import React, { useContext } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Field, Formik, Form, useFormik } from 'formik';
import { Button, Card, CardContent } from '@mui/material';
import DoneIcon from "@mui/icons-material/Done";
import styles from './SuccessPage.module.css'

const SuccessPage = () => {
 
  return (
      <Card>
          <CardContent>
              <div className={styles.messageWrapper}>
                  <DoneIcon className={styles.successIcon} />
                  <p className={styles.successMessage}>File is successfully uploaded</p>
              </div>
          </CardContent>
      </Card>
  );
};

export default SuccessPage;