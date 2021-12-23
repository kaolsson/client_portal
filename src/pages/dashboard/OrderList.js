import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
// import { OrderListTable } from '../../components/dashboard/order';
// import useSettings from '../../hooks/useSettings';
// import ChevronRightIcon from '../../icons/ChevronRight';
// import PlusIcon from '../../icons/Plus';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
 import { getOrders } from '../../slices/order';
 import { useDispatch } from '../../store';

const OrderList = () => {
//  const { settings } = useSettings();
  const { user } = useAuth();
  const dispatch = useDispatch();
//  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    console.log('Hi');
    dispatch(getOrders(user.customerID));
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Orders</title>
      </Helmet>
    </>
  );
};

export default OrderList;
