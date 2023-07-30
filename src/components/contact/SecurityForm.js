// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
//  Card,
//  CardContent,
//  CardHeader,
//  Checkbox,
//  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
//  Typography
} from '@material-ui/core';
// import FileDropzone from '../../FileDropzone';
// import QuillEditor from '../../QuillEditor';
import { messageApi } from '../../api/messageApi';
import useAuth from '../../hooks/useAuth';

const topicOptions = [
  {
    value: '',
    label: ''
  },
  {
    label: 'Login and Access',
    value: 'Topic: Login and Access'
  },
  {
    label: 'Vulnerability',
    value: 'Topic: Vulnerability'
  },
  {
    label: 'Security',
    value: 'Topic: Security'
  },
  {
    label: 'Other',
    value: 'Topic: Other'
  }
];

const typeOptions = [
    {
        value: '',
        label: ''
      },
        {
      label: 'Question',
      value: 'Type: Question'
    },
    {
      label: 'Issue',
      value: 'Type: Issue'
    },
    {
      label: 'Feedback',
      value: 'Type: Feedback'
      }
    ];

const SecurityForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        customerID: user.customerID,
        accountID: user.accountID,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        messageText: '',
        messageText2: '',
        messageText3: '',
        siteOrigin: 'MySmartmaster Client',
        typeOrigin: 'vulnerability',
        status: 'new',
        note: 'Vulnerability support case submitted',
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          messageText: Yup.string().max(400).required(),
          messageText2: Yup.string().max(400).required(),
          messageText3: Yup.string().max(400).required(),
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          values.messageText3 = ['Message: ', values.messageText3].join('');
          console.log(values);
          await messageApi.sendMessage(values);
          setStatus({ success: true });
          setSubmitting(false);
          toast.success('Support message sent!');
          navigate('/');
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
//        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={3}
          >
                <Grid
                    item
                    lg={6}
                    md={6}
                    xs={6}
                >
                  <Box sx={{ mt: 3 }}>
                    <TextField
                        error={Boolean(touched.messageText2 && errors.messageText2)}
                        fullWidth
//                        helperText={touched.messageText2 && errors.messageText2}
                        label="Topic"
                        name="messageText2"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.messageText2}
                        variant="outlined"
                    >
                        {topicOptions.map((topic) => (
                        <option
                            key={topic.value}
                            value={topic.value}
                        >
                            {topic.label}
                        </option>
                        ))}
                    </TextField>
                  </Box>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    xs={6}
                >
                    <Box sx={{ mt: 3 }}>
                      <TextField
                        error={Boolean(touched.messageText && errors.messageText)}
                        fullWidth
//                        helperText={touched.messageText && errors.messageText}
                        label="Type"
                        name="messageText"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.messageText}
                        variant="outlined"
                      >
                        {typeOptions.map((type) => (
                        <option
                            key={type.value}
                            value={type.value}
                        >
                            {type.label}
                        </option>
                        ))}
                      </TextField>
                    </Box>
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            error={Boolean(touched.messageText3 && errors.messageText3)}
                            fullWidth
                            multiline
                            rows={6}
//                            helperText={touched.messageText3 && errors.messageText3}
                            label="Message"
                            name="messageText3"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.messageText3}
                            variant="outlined"
                        />
                    </Box>
                  <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 3
                    }}
                  >
                    <Button
                    fullWidth
                    size="large"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    >
                    Send to Security Expert
                    </Button>
                  </Box>
                </Grid>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default SecurityForm;