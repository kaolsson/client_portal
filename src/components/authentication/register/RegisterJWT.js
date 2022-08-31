import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import useMounted from '../../../hooks/useMounted';

const RegisterJWT = (props) => {
  const mounted = useMounted();
  const { register } = useAuth();

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        policy: false,
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          email: Yup
            .string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          firstName: Yup
            .string()
            .max(255)
            .required('First name is required'),
          lastName: Yup
            .string()
            .max(255)
            .required('Last name is required'),
          password: Yup
            .string()
            .min(7)
            .max(255)
            .required('Password is required'),
          policy: Yup
            .boolean()
            .oneOf([true], 'This field must be checked')
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register(values.email, values.firstName, values.lastName, values.password);

          if (mounted.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          {...props}
        >
          <TextField
            error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            helperText={touched.firstName && errors.firstName}
            label="First Name"
            margin="normal"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            helperText={touched.lastName && errors.lastName}
            label="Last Name"
            margin="normal"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              mt: 2
            }}
          >
            <Checkbox
              checked={values.policy}
              color="primary"
              name="policy"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body2"
            >
              I have read the
              {' '}
              <Link
                color="primary"
                component="a"
                target="blank"
                href="terms"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterJWT;
