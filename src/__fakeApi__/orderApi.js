import { subHours, subMinutes, subSeconds } from 'date-fns';
import axios from 'axios';

const now = new Date();

  const baseUrl = 'http://localhost:6543';
  const orderClientUrl = '/api/sm/order';
  const slash = '/';
//  const userID = 'c7f2f53cc4e84f79bfa66066094ca3af';

  class OrderApi {
    getOrders(userID) {
        const apiUrl = baseUrl + orderClientUrl + slash + userID;

        return new Promise((resolve, reject) => {
            const accessToken = window.localStorage.getItem('accessToken');

            if (accessToken) {
              const tokenTitle = 'token: ';
              const Authorization = tokenTitle + accessToken;

              const theHeaders = {
                headers: {
                  Accept: '*',
                  Authorization
                }
              };

              axios.get(apiUrl, theHeaders)
                .then((response) => {
                  console.log(response.data);
                  resolve(response.data);
                })
                .catch((response) => {
                  console.log('Fail response');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

  getOrdersxx() {
    const orders = [
      {
        id: '5ecb8a6d9f53bfae09e161155ecb8a6d9f53bfae09e16115',
        createdAt: subMinutes(subSeconds(now, 23), 32).getTime(),
        currency: '$',
        customer: {
          email: 'maggie.chen@yaahoo.com',
          name: 'Maggie Chen'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'QT-123456',
        paymentMethod: 'CreditCard',
        status: 'completed',
        totalAmount: 199.00
      },
      {
        id: '111122222222222222222333333333333333333444444444',
        createdAt: subMinutes(subSeconds(now, 23), 32).getTime(),
        currency: '$',
        customer: {
          email: 'kenneth.olsson@ayahoo.com',
          name: 'Kenneth Olsson'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'QT-654321',
        paymentMethod: 'CreditCard',
        status: 'completed',
        totalAmount: 299.00
      },
      {
        id: '5ecb8a738aa6f3e577c2b3ec',
        createdAt: subMinutes(subSeconds(now, 51), 36).getTime(),
        currency: '$',
        customer: {
          email: 'fran.perez@devias.io',
          name: 'Fran Perez'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-101',
        paymentMethod: 'PayPal',
        status: 'completed',
        totalAmount: 500.00
      },
      {
        id: '5ecb8a795e53f134013eba3b',
        createdAt: subMinutes(subSeconds(now, 55), 38).getTime(),
        currency: '$',
        customer: {
          email: 'jie.yan.song@devias.io',
          name: 'Jie Yan Song'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-100',
        paymentMethod: 'CreditCard',
        status: 'pending',
        totalAmount: 500.00
      },
      {
        id: '5ecb8a7f738cc572a9ce0277',
        createdAt: subMinutes(subSeconds(now, 3), 40).getTime(),
        currency: '$',
        customer: {
          email: 'clarke.gillebert@devias.io',
          name: 'Clarke Gillebert'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-99',
        paymentMethod: 'PayPal',
        status: 'completed',
        totalAmount: 500.00
      },
      {
        id: '5e86805e2bafd54f66cc95c3',
        createdAt: subMinutes(subSeconds(now, 32), 45).getTime(),
        currency: '$',
        customer: {
          email: 'miron.vitold@devias.io',
          name: 'Miron Vitold'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-98',
        paymentMethod: 'PayPal',
        status: 'completed',
        totalAmount: 500.00
      },
      {
        id: '5ecb8a85a850c16fa413849c',
        createdAt: subMinutes(subSeconds(now, 57), 48).getTime(),
        currency: '$',
        customer: {
          name: 'Penjani Inyene',
          email: 'penjani.inyene@devias.io'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        status: 'pending',
        number: 'DEV-97',
        paymentMethod: 'CreditCard',
        totalAmount: 500.00
      },
      {
        id: '5ecb8a8e69ba2e409ea0168f',
        createdAt: subMinutes(subSeconds(now, 4), 49).getTime(),
        currency: '$',
        customer: {
          email: 'omar.darobe@devias.io',
          name: 'Omar Darobe'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-96',
        paymentMethod: 'CreditCard',
        status: 'completed',
        totalAmount: 500.00
      },
      {
        id: '5ecb8a9341c68839d387e1c4',
        createdAt: subMinutes(subSeconds(now, 43), 57).getTime(),
        currency: '$',
        customer: {
          email: 'siegbert.gottfried@devias.io',
          name: 'Siegbert Gottfried'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-95',
        paymentMethod: 'PayPal',
        status: 'rejected',
        totalAmount: 500.00
      },
      {
        id: '5ecb8a984bfbb97c9ae458e8',
        createdAt: subMinutes(subSeconds(now, 6), 59).getTime(),
        currency: '$',
        customer: {
          email: 'iulia.albu@devias.io',
          name: 'Iulia Albu'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-94',
        paymentMethod: 'CreditCard',
        status: 'canceled',
        totalAmount: 500.00
      },
      {
        id: '5ecb8aa08d9127dba654ce7a',
        createdAt: subHours(subMinutes(subSeconds(now, 43), 15), 1).getTime(),
        currency: '$',
        customer: {
          email: 'nasimiyu.danai@devias.io',
          name: 'Nasimiyu Danai'
        },
        product: {
          productName: 'TaxAudit',
          productCategory: 'Tax year 2021'
        },
        number: 'DEV-93',
        paymentMethod: 'PayPal',
        status: 'canceled',
        totalAmount: 500.00
      }
    ];

    return Promise.resolve(orders);
  }

  getOrderyy() {
    const order = {
      id: '5ecb8a6879877087d4aa2690',
      coupon: null,
      createdAt: now.getTime(),
      currency: '$',
      customer: {
        address1: '1977 Altair Ave',
        address2: 'STE 202',
        city: 'San Francisco',
        country: 'United States',
        zipCode: '94550',
        state: 'California',
        email: 'kenneth.olsson@yahoo.com',
        name: 'Kenneth Olsson'
      },
      items: [
        {
          id: '5ecb8abbdd6dfb1f9d6bf98b',
          billingCycle: 'monthly',
          currency: '$',
          name: 'Tax Audit',
          description: 'Tax year 2021',
          quantity: 1,
          unitAmount: 49.99
        },
        {
          id: '5ecb8ac10f116d04bed990eb',
          billingCycle: 'monthly',
          currency: '$',
          name: 'Tax Debt Releif',
          description: 'Tax year 2019',
          quantity: 1,
          unitAmount: 199.00
        }
      ],
      number: 'QT-123456',
      paymentMethod: 'CreditCard',
      paymentRef: 'Payment Receipt',
      status: 'completed',
      totalAmount: 500.00
    };

    return Promise.resolve(order);
  }
}

export const orderApi = new OrderApi();
