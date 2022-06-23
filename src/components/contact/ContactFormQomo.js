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
import { messageApi } from '../../__fakeApi__/messageApi';
import useAuth from '../../hooks/useAuth';

const topicOptions = [
  {
    value: '',
    label: ''
  },
  {
    label: 'Tax Debt',
    value: 'Topic: Tax Debt'
  },
  {
    label: 'Tax Audit',
    value: 'Topic: Tax Audit'
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
        label: 'New Case Request',
        value: 'Type: New Case Request'
      },
      {
        label: 'Question on Ongoing Case',
        value: 'Type: Question on Ongoing Case'
      },
      {
        label: 'Feedback on QomoTax',
        value: 'Type: Feedback on QomoTax'
      },
      {
        label: 'Other',
        value: 'Type: Other'
      }
];

const ContactFormQomo = () => {
  const navigate = useNavigate();
//  const [files, setFiles] = useState([]);
  const { user } = useAuth();

//  const handleDrop = (newFiles) => {
//    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//  };

//  const handleRemove = (file) => {
//    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path
//     !== file.path));
//  };

//  const handleRemoveAll = () => {
//    setFiles([]);
//  };

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
        typeOrigin: 'inapp',
        status: 'new',
        note: 'Client request submitted',
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
                        error={Boolean(touched.messageText && errors.messageText)}
                        fullWidth
//                        helperText={touched.messageText2 && errors.messageText2}
                        label="Topic *"
                        name="messageText"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.messageText}
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
                        error={Boolean(touched.messageText2 && errors.messageText2)}
                        fullWidth
//                        helperText={touched.messageText && errors.messageText}
                        label="Type *"
                        name="messageText2"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.messageText2}
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
                            label="Message *"
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
                    Send Request
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

export default ContactFormQomo;
