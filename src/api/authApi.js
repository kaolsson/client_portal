import axios from 'axios';
import {
    serverConnection,
} from './connectionData';

class AuthApi {
  login({ email, password }) {
    const apiUrl = serverConnection.baseUrl + serverConnection.loginUrl;

    const loginBody = JSON.stringify(
      {
        email,
        password
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*',
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, loginBody, theHeaders)
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((response) => {
            console.log(response);
            reject(new Error('Email or password wrong'));
        });
    });
  }

  async register({ email, firstName, lastName, password }) {
    const apiUrl = serverConnection.baseUrl + serverConnection.registerUrl;

    const registerBody = JSON.stringify(
        {
          email,
          firstName,
          lastName,
          password
        }
    );

    const theHeaders = {
        headers: {
            'Content-Type': 'text/plain',
            Accept: '*',
        }
    };

    return new Promise((resolve, reject) => {
        axios.post(apiUrl, registerBody, theHeaders)
            .then((response) => {
                resolve(response.data.token);
            })
            .catch((response) => {
                console.error(response);
                reject(new Error('Internal server error'));
            });
        });
  }

  me(accessToken) {
    const apiUrl = serverConnection.baseUrl + serverConnection.meUrl;

    const tokenTitle = 'token: ';
    const Authorization = tokenTitle + accessToken;

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*',
        Authorization
      }
    };

    return new Promise((resolve, reject) => {
      axios.get(apiUrl, theHeaders)
        .then((response) => {
          console.log(response.data.user);
          resolve(response.data.user);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }

  update(type, user) {
    const apiUrl = serverConnection.baseUrl + serverConnection.meUrl;
    const actionType = type; // update

    console.log(type);

    const theBody = JSON.stringify(
      {
        actionType,
        user
      }
    );

    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken) {
        const tokenTitle = 'token: ';
        const Authorization = tokenTitle + accessToken;
        const theHeaders = {
          headers: {
            'Content-Type': 'text/plain',
            Accept: '*',
            Authorization
          }
        };
        axios.put(apiUrl, theBody, theHeaders)
          .then((response) => {
            console.log(response.data.user);
            resolve(response.data.user);
          })
          .catch((response) => {
            reject(new Error(response.data));
          });
      } else {
        reject(new Error('No token'));
      }
    });
  }

  forgotPassword(userEmail) {
    console.log(userEmail);
    const apiUrl = serverConnection.baseUrl + serverConnection.authUrl;
    const authType = 1;

    const theBody = JSON.stringify(
      {
        authType,
        userEmail
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, theBody, theHeaders)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }

  forgotPasswordSubmit(userEmail, code, newPassword) {
    const apiUrl = serverConnection.baseUrl + serverConnection.authUrl;
    const authType = 2;

    const theBody = JSON.stringify(
      {
        authType,
        userEmail,
        code,
        newPassword
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, theBody, theHeaders)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }

  resendCode(userEmail) {
    const apiUrl = serverConnection.baseUrl + serverConnection.authUrl;
    const authType = 3;

    const theBody = JSON.stringify(
      {
        authType,
        userEmail
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, theBody, theHeaders)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }

  uploadAvatar(fileObj, clientID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.avatarUrl;

    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken) {
        const tokenTitle = 'token: ';
        const Authorization = tokenTitle + accessToken;
        const metaData = ['{"userID": "', clientID, '", "docType": "tax", "description": "This is a document."}'].join('');

        console.log(metaData);
        const formData = new FormData();
        formData.append(
          'document',
          fileObj,
          fileObj.name
        );
        formData.append(
            'meta',
            metaData
          );

        const theHeaders = {
          headers: {
            Accept: '*',
            Authorization
          }
        };

        axios.post(apiUrl, formData, theHeaders)
          .then((response) => {
            resolve(response);
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

  getAvatar() {
    const apiUrl = serverConnection.baseUrl + serverConnection.avatarUrl;

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

export const authApi = new AuthApi();
