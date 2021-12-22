import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
import ArrowRightIcon from '../../icons/ArrowRight';
import BriefcaseIcon from '../../icons/Briefcase';
import DownloadIcon from '../../icons/Download';
import ExternalLinkIcon from '../../icons/ExternalLink';
import InformationCircleIcon from '../../icons/InformationCircle';
import PlusIcon from '../../icons/Plus';
import UsersIcon from '../../icons/Users';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
import UserDetails from '../../components/widgets/detail-lists/UserDetails';
import VendorDetails from '../../components/widgets/detail-lists/VendorDetails';
import ActiveProjectDashboard from '../../components/widgets/grouped-lists/ActiveProjectDashboard';
import NotPaidOrderDashboard from '../../components/widgets/grouped-lists/NotPaidOrderDashboard';
import WidgetPreviewer from '../../components/WidgetPreviewer';

const Overview = () => {
  const { settings } = useSettings();
  const { user } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Overview</title>
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
            spacing={3}
          >
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  variant="overline"
                >
                  Dashboard
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  Weclome Back
                  {', ' }
                  {user.firstName}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Last login
                  {': '}
                  {user.lastLogin.substring(0, 10)}
                  {' at '}
                  {user.lastLogin.substring(11, 16)}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  href="/contactQomo"
                >
                  New Request
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <WidgetPreviewer
                element={<UserDetails />}
                name="Client"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <WidgetPreviewer
                element={<VendorDetails />}
                name="Provider"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <WidgetPreviewer
                element={<NotPaidOrderDashboard />}
                name="Pending Order Payments"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <WidgetPreviewer
                element={<ActiveProjectDashboard />}
                name="Active Cases"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader
                  disableTypography
                  subheader={(
                    <Typography
                      color="textPrimary"
                      variant="h6"
                    >
                      Need help with tax
                    </Typography>
                  )}
                  title={(
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pb: 2
                      }}
                    >
                      <BriefcaseIcon color="primary" />
                      <Typography
                        color="textPrimary"
                        sx={{ pl: 1 }}
                        variant="h6"
                      >
                        Tax Help
                      </Typography>
                    </Box>
                  )}
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: '8px' }}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Contact us for help with taxes, including tax depbt, tax audit and other.
                    We can help in a vide array of tax issues.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: 'background.default',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    variant="text"
                    href="/contactQomo"
                  >
                    Contact QomoTax
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader
                  disableTypography
                  subheader={(
                    <Typography
                      color="textPrimary"
                      variant="h6"
                    >
                      Need help figuring things out?
                    </Typography>
                  )}
                  title={(
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pb: 2
                      }}
                    >
                      <InformationCircleIcon color="primary" />
                      <Typography
                        color="textPrimary"
                        sx={{ pl: 1 }}
                        variant="h6"
                      >
                        Help Center
                      </Typography>
                    </Box>
                  )}
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: '8px' }}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Contact our support center for any technical problens or questions.
                    We are here to support you to make MySmartMaster a pleasent use.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: 'background.default',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    endIcon={<ExternalLinkIcon fontSize="small" />}
                    variant="text"
                    href="/contact"
                  >
                    Contact Support
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader
                  disableTypography
                  subheader={(
                    <Typography
                      color="textPrimary"
                      variant="h6"
                    >
                      Download our Free PDF and learn more about Taxes
                    </Typography>
                  )}
                  title={(
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pb: 2
                      }}
                    >
                      <DownloadIcon color="primary" />
                      <Typography
                        color="textPrimary"
                        sx={{ pl: 1 }}
                        variant="h6"
                      >
                        Download
                      </Typography>
                    </Box>
                  )}
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: '8px' }}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Taxes can be a complicated topic and most people have difficulty
                    in getting their heads around it. Download the pdf
                    and learn the basics to get a head start.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: 'background.default',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    endIcon={<DownloadIcon fontSize="small" />}
                    variant="text"
                    component="a"
                    target="blank"
                    href="/static/docs/tax/Cayman-Islands-e-book-October2018.pdf"

                  >
                    Download Free PDF
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader
                  disableTypography
                  subheader={(
                    <Typography
                      color="textPrimary"
                      variant="h6"
                    >
                      Contacts allow you to manage your
                      company contracts
                    </Typography>
                  )}
                  title={(
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pb: 2
                      }}
                    >
                      <UsersIcon color="primary" />
                      <Typography
                        color="textPrimary"
                        sx={{ pl: 1 }}
                        variant="h6"
                      >
                        Message Center
                      </Typography>
                    </Box>
                  )}
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: '8px' }}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    MySmartMaster has a easy to use message center to make
                    the intreractions quick and accurate. Your case manager is always availabe.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: 'background.default',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    variant="text"
                    href="/chat"
                  >
                    Message Center
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Overview;
