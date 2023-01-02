import { useEffect } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Avatar, Box, Container, Link, Typography } from '@material-ui/core';
import { SecurityForm } from '../components/contact';
import SmartMasterLogoBlue from '../components/SmartMasterLogoBlue';
import gtm from '../lib/gtm';

const ContactSecurity = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartmaster | Security</title>
      </Helmet>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          minHeight: '100%'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            pt: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15
              }
            }}
          >
            <Link
              component={BrowserLink}
              to="/"
            >
              <SmartMasterLogoBlue />
            </Link>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                py: 3
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  mr: 2
                }}
                variant="rounded"
                src="/static/mock-images/avatars/sm_avatar.png"
              />
              <Typography
                color="textPrimary"
                variant="overline"
              >
                Contact Tech Support
              </Typography>
            </Box>
            <Typography
              color="textPrimary"
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h1"
            >
              If you suspect a vulnerability
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ py: 3 }}
              variant="body1"
            >
              If you suspect a vulnerability or have a question about security? Fill out the form
              and a senior security expert will be in touch shortly.
            </Typography>
            <Typography
              sx={{ color: 'primary.main' }}
              variant="h6"
            >
              100+ supported users in MySmartMaster
            </Typography>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            pt: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              color="textPrimary"
              variant="h6"
              sx={{ pb: 3 }}
            >
              Please fill the form below describing your vulnerability or question
            </Typography>
            <Box sx={{}}>
              <SecurityForm />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ContactSecurity;
