import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Box, Card, CardContent, Container, Divider, Typography } from '@material-ui/core';
// import AuthBanner from '../../components/authentication/AuthBanner';
import {
  RegisterAmplify,
  RegisterAuth0,
  RegisterFirebase,
  RegisterJWT
} from '../../components/authentication/register';
// import Logo from '../../components/Logo';
import useAuth from '../../hooks/useAuth';
import gtm from '../../lib/gtm';
import SmartMasterLogoBlueLarge from '../../components/SmartMasterLogoBlueLarge';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

const Register = () => {
  const { platform } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Register</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ py: '80px' }}
        >
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <RouterLink to="/">
              <SmartMasterLogoBlueLarge
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink>
          </Box>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Register
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Register to the secure MySmartmaster platform
                  </Typography>
                </div>
                <Box
                  sx={{
                    height: 32,
                    '& > img': {
                      maxHeight: '100%',
                      width: 'auto'
                    }
                  }}
                >
                  <img
                    alt="Auth platform"
                    src={platformIcons[platform]}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                {platform === 'Amplify' && <RegisterAmplify />}
                {platform === 'Auth0' && <RegisterAuth0 />}
                {platform === 'Firebase' && <RegisterFirebase />}
                {platform === 'JWT' && <RegisterJWT />}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Button
                variant="outlined"
                color="primary"
                component="a"
                href="/authentication/login"
              >
                I already have an account - take me to Login
              </Button>
{/*              <Link
                color="textSecondary"
                component={RouterLink}
                to="/authentication/login"
                variant="h6"
              >
                I already have an account - take me to Login
              </Link> */}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;
