import { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  // Link,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import {
  AccountBillingSettings,
  AccountGeneralSettings,
  AccountNotificationsSettings,
  AccountSecuritySettings
} from '../../components/dashboard/account';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';

const tabs = [
  { label: 'Profile', value: 'profile' },
  //  { label: 'Billing', value: 'billing' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Security', value: 'security' }
];

const Account = () => {
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('profile');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Account</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Profile
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Account
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Profile
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'profile' && <AccountGeneralSettings />}
            {currentTab === 'billing' && <AccountBillingSettings />}
            {currentTab === 'notifications' && <AccountNotificationsSettings />}
            {currentTab === 'security' && <AccountSecuritySettings />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;
