import axios from 'axios';
import {
    serverConnection,
} from './connectionData';
import getBaseUrl from './baseUrl';

class VendorApi {
  getVendor(accountID) {
    const apiUrl = getBaseUrl() + serverConnection.orgUrl + serverConnection.slash + accountID;

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

  getLogo(accountID) {
    const apiUrl = getBaseUrl() + serverConnection.logoUrl + serverConnection.slash + accountID;

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

export const vendorApi = new VendorApi();
