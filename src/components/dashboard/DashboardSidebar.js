import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Divider, Drawer, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useAuth from '../../hooks/useAuth';
import BriefcaseIcon from '../../icons/Briefcase';
// import CalendarIcon from '../../icons/Calendar';
import ChartSquareBarIcon from '../../icons/ChartSquareBar';
import ChatAltIcon from '../../icons/ChatAlt';
// import ClipboardListIcon from '../../icons/ClipboardList';
// import FolderOpenIcon from '../../icons/FolderOpen';
import UserIcon from '../../icons/User';
import Logo from '../Logo';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import { authApi } from '../../__fakeApi__/authApi';
import useMounted from '../../hooks/useMounted';

const sections = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'My Dashboard',
        path: '/',
        icon: <ChartSquareBarIcon fontSize="small" />
      }
    ]
  },
  {
    title: 'Engagements',
    items: [
      {
        title: 'Work Cases',
        path: '/projects/browse',
        icon: <BriefcaseIcon fontSize="small" />,
      },
      {
        title: 'My Chat',
        path: '/chat',
        icon: <ChatAltIcon fontSize="small" />
      },
    ]
  },
//  {
//    title: 'Messages',
//    items: [
//      {
//        title: 'Actions',
//        path: '/kanban',
//        icon: <ClipboardListIcon fontSize="small" />
//      },
//      {
//        title: 'My Chat',
//        path: '/chat',
//        icon: <ChatAltIcon fontSize="small" />
//      },
//      {
//        title: 'Calendar',
//        path: '/calendar',
//        icon: <CalendarIcon fontSize="small" />
//      },
//    ]
//  },
  {
    title: 'Account',
    items: [
      {
        title: 'My Profile',
        path: '/account',
        icon: <UserIcon fontSize="small" />
      },
//      {
//        title: 'Orders',
//        path: '/orders/browse',
//        icon: <FolderOpenIcon fontSize="small" />
//      },
    ]
  },
];

const DashboardSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const { user } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [avatar, setAvatar] = useState(null);
  const mounted = useMounted();

  const getAvatar = useCallback(async () => {
    try {
        const data = await authApi.getAvatar();
        if (mounted.current) {
            setAvatar(data);
        }
    } catch (err) {
        console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

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
                src={avatar}
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
