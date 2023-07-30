import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, IconButton, Toolbar } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import MenuIcon from '../../icons/Menu';
import AccountPopover from './AccountPopover';
// import ContactsPopover from './ContactsPopover';
// import ContentSearch from './ContentSearch';
import LanguagePopover from './LanguagePopover';
// import Logo from '../Logo';
import SmartMasterLogo from '../SmartMasterLogo';
// import NotificationsPopover from './NotificationsPopover';
// import PlusIcon from '../../icons/Plus';

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    backgroundColor: theme.palette.primary.appbar,
    boxShadow: 'none',
    color: theme.palette.primary.contrastText
  }),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none'
  }),
  zIndex: theme.zIndex.drawer + 100
}));

const DashboardNavbar = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="/">
          <SmartMasterLogo />
        </RouterLink>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2
          }}
        />
        <Box sx={{ ml: 2 }}>
        <LanguagePopover />
{/*        <Box sx={{ ml: 1 }}>
          <NotificationsPopover />
        </Box> */}
        </Box>
        <Box sx={{ ml: 5 }}>
        <Button
           color="warning"
//           startIcon={<PlusIcon fontSize="small" />}
           variant="contained"
           href="/contactQomo"
        >
           Contact
        </Button>
        </Box>
        <Box sx={{ ml: 5 }}>
          <AccountPopover />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default DashboardNavbar;
