import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { projectApi } from '../../api/projectApi';
import { ProjectBrowseFilter, ProjectBrowseResults } from '../../components/dashboard/project';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import PlusIcon from '../../icons/Plus';
import gtm from '../../lib/gtm';

const ProjectBrowse = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProjects = useCallback(async () => {
    try {
      const data = await projectApi.getProjects();

      if (mounted.current) {
        setProjects(data);
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
        <title>Dashboard: Project Browse | Material Kit Pro</title>
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
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Our work cases for you
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
                  Engagements
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Cases
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  to="/dashboard/projects/new"
                  variant="contained"
                >
                  New Order
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ProjectBrowseFilter />
          </Box>
          <Box sx={{ mt: 6 }}>
            <ProjectBrowseResults projects={projects} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectBrowse;
