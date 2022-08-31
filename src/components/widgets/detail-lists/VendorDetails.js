import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  // CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
// import Label from '../../Label';
// import LockIcon from '../../../icons/Lock';
import UsersIcon from '../../../icons/Users';
import useMounted from '../../../hooks/useMounted';
import { vendorApi } from '../../../api/vendorApi';
import useAuth from '../../../hooks/useAuth';

const VendorDetails = () => {
  const mounted = useMounted();
  const [vendor, setVendor] = useState([]);
  const { user } = useAuth();

  const getVendor = useCallback(async () => {
    try {
      const data = await vendorApi.getVendor(user.accountID);

      if (mounted.current) {
        setVendor(data.vendor);
        console.log(data.vendor);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getVendor();
  }, [getVendor]);

  return (
    <Box
      sx={{
        backgroundColor: 'background.widget',
        minHeight: '100%',
        p: 3
      }}
    >
      <Card>
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.organization}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.contactEmail}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.phoneNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.address1}
                  {', '}
                  {vendor.address2}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.city}
                  {', '}
                  {vendor.zipCode}
                  {', '}
                  {vendor.state}
                  {', '}
                  {vendor.country}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            p: 1
          }}
        >
          <Button
            color="inherit"
            startIcon={<UsersIcon fontSize="small" />}
            sx={{ mt: 1 }}
            variant="text"
            href="/contactQomo"
          >
            Contact
            {' '}
            {vendor.name}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default VendorDetails;
