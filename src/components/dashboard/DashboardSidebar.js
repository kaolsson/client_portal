import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Divider, Drawer, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import ReceiptIcon from '@material-ui/icons/Receipt';
import useAuth from '../../hooks/useAuth';
import BriefcaseIcon from '../../icons/Briefcase';
import CalendarIcon from '../../icons/Calendar';
// import ChartPieIcon from '../../icons/ChartPie';
import ChartSquareBarIcon from '../../icons/ChartSquareBar';
import ChatAltIcon from '../../icons/ChatAlt';
import ClipboardListIcon from '../../icons/ClipboardList';
import FolderOpenIcon from '../../icons/FolderOpen';
// import MailIcon from '../../icons/Mail';
// import ShareIcon from '../../icons/Share';
// import ShoppingBagIcon from '../../icons/ShoppingBag';
// import ShoppingCartIcon from '../../icons/ShoppingCart';
import UserIcon from '../../icons/User';
// import UsersIcon from '../../icons/Users';
import Logo from '../Logo';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';

const sections = [
  {
    title: 'General',
    items: [
      {
        title: 'Dashboard',
        path: '/',
        icon: <ChartSquareBarIcon fontSize="small" />
      },
      {
        title: 'Account',
        path: '/account',
        icon: <UserIcon fontSize="small" />
      },
      {
        title: 'Orders',
        path: '/orders/browse',
        icon: <FolderOpenIcon fontSize="small" />
      },
    ]
  },
  {
    title: 'Engagements',
    items: [
      {
        title: 'Cases',
        path: '/projects/browse',
        icon: <BriefcaseIcon fontSize="small" />,
      },
    ]
  },
  {
    title: 'Apps',
    items: [
      {
        title: 'My Actions',
        path: '/kanban',
        icon: <ClipboardListIcon fontSize="small" />
      },
      {
        title: 'Messages',
        path: '/chat',
        icon: <ChatAltIcon fontSize="small" />
      },
      {
        title: 'Calendar',
        path: '/calendar',
        icon: <CalendarIcon fontSize="small" />
      },
    ]
  },
];

const DashboardSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const { user } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box
          sx={{
            display: {
              lg: 'none',
              xs: 'flex'
            },
            justifyContent: 'center',
            p: 2
          }}
        >
          <RouterLink to="/">
            <Logo
              sx={{
                height: 40,
                width: 40
              }}
            />
          </RouterLink>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 1,
              display: 'flex',
              overflow: 'hidden',
              p: 2
            }}
          >
            <RouterLink to="/account">
              <Avatar
                src={user.avatar}
                sx={{
                  cursor: 'pointer',
                  height: 48,
                  width: 48
                }}
              />
            </RouterLink>
            <Box sx={{ ml: 2 }}>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                {user.firstName}
                {' '}
                {user.middleInitial}
                {' '}
                {user.lastName}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {user.city}
                {', '}
                {user.state}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3
                }
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            Need Technical Assistance?
          </Typography>
          <Button
            color="primary"
            component={RouterLink}
            sx={{ mt: 2 }}
            to="/contact"
            variant="outlined"
          >
            Contact Support
          </Button>
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100% - 64px) !important',
            top: '64px !Important',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 280
        }
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default DashboardSidebar;
