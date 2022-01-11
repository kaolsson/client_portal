import axios from 'axios';

const baseUrl = 'http://localhost:6543';
// const baseUrl = 'https://api.copper-wired.com';
const notificationUrl = '/api/sm/notification';
const slash = '/';

class NotificationApi {
  getNotifications(customerID) {
    const apiUrl = baseUrl + notificationUrl + slash + customerID;

    return new Promise((resolve, reject) => {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log('Here 1');

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
}

export const notificationApi = new NotificationApi();
