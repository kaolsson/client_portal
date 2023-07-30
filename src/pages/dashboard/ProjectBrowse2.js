import { useCallback, useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
//  Button,
  Container,
  Divider,
  Grid,
  // Link,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import {
  ProjectBrowseResults,
//  ProjectApplicationModal
} from '../../components/dashboard/project';
import useSettings from '../../hooks/useSettings';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { projectApi } from '../../api/projectApi';
import useAuth from '../../hooks/useAuth';
// import ChatIcon from '@material-ui/icons/Chat';

const tabs = [
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const ProjectBrowse2 = () => {
  const { user } = useAuth();
  const mounted = useMounted();
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('active');
  const [activeProjects, setActiveProjects] = useState([]);
  const [completeProjects, setCompleteProjects] = useState([]);
//  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

//  const handleApplyModalOpen = () => {
//    setIsApplicationOpen(true);
//  };

//  const handleApplyModalClose = () => {
//    setIsApplicationOpen(false);
//  };

  const getProjects = useCallback(async () => {
    try {
      const data = await projectApi.getProjects(user.customerID);

      if (mounted.current) {
        setActiveProjects(data.projects.active);
        setCompleteProjects(data.projects.complete);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Cases</title>
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
                Work Cases
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
                  Engagement
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Work Cases
                </Typography>
              </Breadcrumbs>
            </Grid>
{/*            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  onClick={handleApplyModalOpen}
                  startIcon={<ChatIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  New Case Inquiry
                </Button>
              </Box>
            </Grid> */}
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
          <Box sx={{ mt: 6 }}>
            {currentTab === 'active' && <ProjectBrowseResults projects={activeProjects} />}
            {currentTab === 'completed' && <ProjectBrowseResults projects={completeProjects} />}
          </Box>
        </Container>
      </Box>
{/*      <ProjectApplicationModal
        onApply={handleApplyModalClose}
        onClose={handleApplyModalClose}
        open={isApplicationOpen}
      /> */}
    </>
  );
};

export default ProjectBrowse2;
