import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { orderApi } from '../../__fakeApi__/orderApi';
import { OrderItems, OrderSummary } from '../../components/dashboard/order';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import ChatAlt from '../../icons/ChatAlt';
import gtm from '../../lib/gtm';
import { parse } from 'query-string';
import useAuth from '../../hooks/useAuth';

function findArrayElementById(array, id) {
    return array.find((element) => (element.id === id));
}

const OrderDetails = () => {
  const { user } = useAuth();
  const mounted = useMounted();
  const { settings } = useSettings();
  const [orderId] = useState(parse(window.location.search).oid);
  const [order, setOrder] = useState(null);

  const getOrders = useCallback(async () => {
    try {
      const data = await orderApi.getOrders(user.customerID);
      if (mounted.current) {
        const thisOrder = findArrayElementById(data.orders.order, orderId);
        setOrder(thisOrder);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (!order) {
    return <p> </p>;
   }

  return (
    <>
      <Helmet>
        <title>Dashboard: Order Details | Material Kit Pro</title>
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
                Order Details
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
                  General
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Orders
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Order
                  {' '}
                  {order.id}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<ChatAlt fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Contact Accounting
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={4}
                xl={3}
                xs={12}
              >
                <OrderSummary order={order} />
              </Grid>
              <Grid
                item
                md={8}
                xl={9}
                xs={12}
              >
                <OrderItems ordercarts={order.carts} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OrderDetails;
