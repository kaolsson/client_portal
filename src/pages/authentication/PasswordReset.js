import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@material-ui/core';
// import AuthBanner from '../../components/authentication/AuthBanner';
import { PasswordResetAmplify } from '../../components/authentication/password-reset';
import SmartMasterLogoBlueLarge from '../../components/SmartMasterLogoBlueLarge';
import useAuth from '../../hooks/useAuth';
import gtm from '../../lib/gtm';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

const PasswordReset = () => {
  const { platform } = useAuth();
  const pl = 'Auth0';

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Password Reset | Material Kit Pro</title>
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
          sx={{ py: 10 }}
        >
          <Box
            sx={{
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8
            }}
          />
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
                    Password Reset
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Reset your account password using your code
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
                    src={platformIcons[pl]}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                {platform === 'JWT' && <PasswordResetAmplify />}
              </Box>
              <Divider sx={{ my: 3 }} />
              {platform === 'Amplify' && (
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  to="/authentication/password-recovery"
                  variant="body2"
                >
                  Did you not receive the code?
                </Link>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordReset;
