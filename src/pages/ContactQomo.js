import { useEffect, useState, useCallback } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Avatar, Box, Container, Link, Typography } from '@material-ui/core';
import { ContactFormQomo } from '../components/contact';
import MailIcon from '../icons/Mail';
import gtm from '../lib/gtm';
import { vendorApi } from '../api/vendorApi';
import useAuth from '../hooks/useAuth';

const ContactQomo = () => {
  const [vendor, setVendor] = useState(null);
  const [logo, setLogo] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getLogo = useCallback(async () => {
    try {
        const data = await vendorApi.getVendor(user.accountID);
        setLogo(data.logo);
        setVendor(data.vendor);
    } catch (err) {
        console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log('Here1');
    getLogo();
  }, [getLogo]);

  if (!vendor) {
    return <p> </p>;
  }

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Contact</title>
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
                <img
                    alt="Logo"
                    width="250"
                    height="120"
                    align="middle"
                    src={logo}
                />
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
                src="/static/mock-images/avatars/avatar-kenneth_olsson.png"
              >
                <MailIcon />
              </Avatar>
              <Typography
                color="textPrimary"
                variant="overline"
              >
                Contact
                {' '}
                {vendor.organization}
              </Typography>
            </Box>
            <Typography
              color="textPrimary"
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h1"
            >
              Talk to our representative
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ py: 3 }}
              variant="body1"
            >
              Have a request for a new case to
              {' '}
              {vendor.organization}
              ? Or have a questions or problems to discuss? Fill out the form
              and a representative will be in touch shortly.
            </Typography>
            <Typography
              sx={{ color: 'primary.main' }}
              variant="h6"
            >
              {vendor.organization}
              {' '}
              has over 1000+ served customers
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
              Please fill the form below describing your request or question
            </Typography>
            <Box sx={{}}>
              <ContactFormQomo />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ContactQomo;
