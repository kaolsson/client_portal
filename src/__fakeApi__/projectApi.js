import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import axios from 'axios';

const now = new Date();
const baseUrl = 'http://localhost:6543';
// const baseUrl = 'https://api.copper-wired.com';
const fileUrl = '/api/sm/document';
const clientUrl = '/api/sm/project/client';
const caseUrl = '/api/sm/project';
const slash = '/';

class ProjectApi {
  fileUpload(fileObj, caseID) {
    const apiUrl = baseUrl + fileUrl;

    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken) {
        const tokenTitle = 'token: ';
        const Authorization = tokenTitle + accessToken;
        const metaData = ['{"caseID": "', caseID, '", "docType": "tax", "description": "This is a document."}'].join('');

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

  fileDelete(documentID) {
    const apiUrl = baseUrl + fileUrl + slash + documentID;

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

        axios.delete(apiUrl, theHeaders)
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

  fileDownload(documentID) {
    const apiUrl = baseUrl + fileUrl + slash + documentID;

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

  getProjects(customerID) {
    const apiUrl = baseUrl + clientUrl + slash + customerID;

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

    getProject(caseID) {
        const apiUrl = baseUrl + caseUrl + slash + caseID;

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

    getProjectsAMock() {
      const projects = [
      {
        id: '5e8dcef8f95685ce21f16f3d',
        author: {
          id: '5e887b7602bdbc4dbb234b27',
          avatar: '/static/mock-images/avatars/avatar-maggie_chen.png',
          name: 'Maggie Chen'
        },
        budget: 6125.00,
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        currency: '$',
        isLiked: true,
        likes: 7,
        location: 'California',
        image: '/static/mock-images/projects/project_1.png',
        rating: 5,
        membersCount: 2,
        title: 'Tax Audit 2019',
        type: 'Tax Services',
        updatedAt: subMinutes(now, 24).getTime(),
        status: 'Active',
        messageCount: 4,
        action: 'userAction'
      },
      {
        id: '5e8dcf076c50b9d8e756a5a2',
        author: {
          id: '5e887d0b3d090c1b8f162003',
          avatar: '/static/mock-images/avatars/avatar-kenneth_olsson.png',
          name: 'Kenneth Olsson'
        },
        budget: 4205.00,
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        currency: '$',
        isLiked: true,
        likes: 12,
        location: 'Oregon',
        image: '/static/mock-images/projects/project_2.png',
        rating: 4.5,
        membersCount: 3,
        title: 'Tax Debt help',
        type: 'Tax Services',
        updatedAt: subHours(now, 1).getTime(),
        status: 'Active',
        messageCount: 4,
        action: 'noAction'
      },
      {
        id: '5e8dcf105a6732b3ed82cf7a',
        author: {
          id: '5e88792be2d4cfb4bf0971d9',
          avatar: '/static/mock-images/avatars/avatar-maggie_chen.png',
          name: 'Maggie Chen'
        },
        budget: 2394.00,
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        currency: '$',
        isLiked: true,
        likes: 18,
        location: 'California',
        image: '/static/mock-images/projects/project_3.png',
        rating: 4.7,
        membersCount: 8,
        title: 'Tax Adit 2018',
        type: 'Tax Services',
        updatedAt: subHours(now, 16).getTime(),
        status: 'Active',
        messageCount: 4,
        action: 'userAction'
      },
    ];
    return Promise.resolve(projects);
  }

  getProjectsCMock() {
    const projects = [
      {
        id: '5e8dcf1cc7155d0e947dc27f',
        author: {
          id: '5e8877da9a65442b11551975',
          avatar: '/static/mock-images/avatars/avatar-iulia_albu.png',
          name: 'Iulia Albu'
        },
        budget: 2784.00,
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        currency: '$',
        image: '/static/mock-images/projects/project_4.png',
        isLiked: false,
        likes: 1,
        location: 'California',
        membersCount: 10,
        rating: 2,
        title: 'Tax fraud for Trump',
        type: 'Tax Services',
        updatedAt: subDays(now, 3).getTime(),
        status: 'Active',
        messageCount: 4,
        action: 'closed'
      },
      {
        id: '5e8dcf252313876001e83221',
        author: {
          id: '5e887ac47eed253091be10cb',
          avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
          name: 'Carson Darrin'
        },
        budget: 5835.00,
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        currency: '$',
        isLiked: false,
        likes: 7,
        location: 'California',
        image: '/static/mock-images/projects/project_5.jpg',
        rating: 5,
        membersCount: 2,
        title: 'Audit for Donut store',
        type: 'Tax Services',
        updatedAt: subDays(now, 7).getTime(),
        status: 'Active',
        messageCount: 4,
        action: 'closed'
      },
      {
        id: '5e8dcf4250d77c954b04902e',
        author: {
          id: '5e887b7602bdbc4dbb234b27',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          name: 'Jie Yan Song'
        },
        budget: 4255.00,
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        currency: '$',
        isLiked: true,
        likes: 4,
        location: 'California',
        image: '/static/mock-images/projects/project_5.jpg',
        rating: 4.2,
        membersCount: 12,
        title: 'IRS harassment  2016',
        type: 'Tax Services',
        updatedAt: subDays(now, 8).getTime(),
        status: 'Active',
        messageCount: 4,
        action: 'closed'
      }
    ];
    return Promise.resolve(projects);
  }

  getProjectMock() {
    const project = {
      id: '5e8dcf076c50b9d8e756a5a2',
      startDate: addDays(now, 7).getTime(),
      tags: ['Tax', 'Audit', '2019'],
      title: 'Tax Audit 2019',
      vendor: 'QomoTax',
      ownerAvatar: '/static/mock-images/avatars/avatar-maggie_chen.png',
      updatedAt: subMinutes(now, 23).getTime(),
      action: 'userAction',
      owner: [
        {
          id: '5e887a62195cc5aef7e8ca5d',
          avatar: '/static/mock-images/avatars/avatar-maggie_chen.png',
          title: 'Tax Audit Expert',
          name: 'Maggie Chen',
        },
      ],
      clientFiles: [
        {
          id: 'ce35ac1a188f4531931b2c849356ffbb',
          fileName: 'tax return.pdf',
          fileType: 'pdf',
          description: 'Tax return for 2019',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'active',
          uploadBy: 'Kenneth Olsson'
        },
        {
          id: '5e8dd08f44603e3300b75cf1',
          fileName: 'tax notice.pdf',
          fileType: 'pdf',
          description: 'Tax notice for late payment',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'active',
          uploadBy: 'Kenneth Olsson'
        },
        {
          id: '5e8dd08f44603e3300b75cf1',
          fileName: 'tax notice.pdf',
          fileType: 'pdf',
          description: 'Tax notice for late payment',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'obsolete',
          uploadBy: 'Kenneth Olsson'
        },
        {
          id: '5e8dd08f44603e3300b75cf1',
          fileName: 'tax notice.pdf',
          fileType: 'pdf',
          description: 'Tax notice for late payment',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'rejected',
          uploadBy: 'Kenneth Olsson'
        },
      ],
      vendorFiles: [
        {
          id: '5e8dd0828d628e6f40abdfe8',
          fileName: 'tax return.pdf',
          fileType: 'pdf',
          description: 'Tax return for 2019',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'active',
          uploadBy: 'Kenneth Olsson'
        },
        {
          id: '5e8dd08f44603e3300b75cf1',
          fileName: 'tax notice.pdf',
          fileType: 'pdf',
          description: 'Tax notice for late payment',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'active',
          uploadBy: 'Kenneth Olsson'
        },
        {
          id: '5e8dd08f44603e3300b75cf1',
          fileName: 'tax notice.pdf',
          fileType: 'pdf',
          description: 'Tax notice for late payment',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'obsolete',
          uploadBy: 'Kenneth Olsson'
        },
        {
          id: '5e8dd08f44603e3300b75cf1',
          fileName: 'tax notice.pdf',
          fileType: 'pdf',
          description: 'Tax notice for late payment',
          createdAt: subMinutes(now, 23).getTime(),
          status: 'rejected',
          uploadBy: 'Kenneth Olsson'
        },
      ],
      activities: [
        {
          id: '5e8dd0828d628e6f40abdfe8',
          createdAt: subMinutes(now, 23).getTime(),
          description: 'Upload the 1040 tax document for 2019',
          status: 'open',
          type: 'upload_file'
        },
        {
          id: '5e8dd0893a6725f2bb603617',
          createdAt: subHours(now, 2).getTime(),
          description: 'Please send iformation why yu did not pay tax 2018.',
          status: 'completed',
          type: 'information'
        },
      ],
      applicants: [
        {
          id: '5e887a62195cc5aef7e8ca5d',
          avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
          commonConnections: 12,
          cover: '/static/mock-images/covers/cover_2.jpg',
          name: 'Marcus Finn',
          skills: [
            'User Experience',
            'FrontEnd development',
            'HTML5',
            'VueJS',
            'ReactJS'
          ]
        },
        {
          id: '5e887ac47eed253091be10cb',
          avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
          commonConnections: 5,
          cover: '/static/mock-images/covers/cover_3.jpg',
          name: 'Carson Darrin',
          skills: [
            'User Interface',
            'FullStack development',
            'Angular',
            'ExpressJS'
          ]
        },
        {
          id: '5e86809283e28b96d2d38537',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          commonConnections: 17,
          cover: '/static/mock-images/covers/cover_1.jpg',
          name: 'Jane Rotanson',
          skills: [
            'BackEnd development',
            'Firebase',
            'MongoDB',
            'ExpressJS'
          ]
        }
      ],
      author: {
        id: '5e887d0b3d090c1b8f162003',
        avatar: '/static/mock-images/avatars/avatar-omar_darobe.png',
        name: 'Omar Darobe'
      },
      budget: 12500.00,
      caption: 'We\'re looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
      currency: '$',
      description: `
Lorem ipsum dolor sit amet, 

consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      `,
      endDate: addDays(now, 14).getTime(),
      files: [
        {
          id: '5e8dd0721b9e0fab56d7238b',
          mimeType: 'image/png',
          name: 'example-project1.jpg',
          size: 1024 * 1024 * 3,
          url: '/static/mock-images/projects/project_4.png'
        },
        {
          id: '5e8dd0784431995a30eb2586',
          mimeType: 'application/zip',
          name: 'docs.zip',
          size: 1024 * 1024 * 25,
          url: '#'
        },
        {
          id: '5e8dd07cbb62749296ecee1c',
          mimeType: 'image/png',
          name: 'example-project2.jpg',
          size: 1024 * 1024 * 2,
          url: '/static/mock-images/projects/project_1.png'
        }
      ],
      isActive: 'active',
      isLiked: true,
      location: 'Europe',
      members: [
        {
          id: '5e887a62195cc5aef7e8ca5d',
          avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
          job: 'Front End Developer',
          name: 'Marcus Finn'
        },
        {
          id: '5e887ac47eed253091be10cb',
          avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
          job: 'UX Designer',
          name: 'Carson Darrin'
        },
        {
          id: '5e887b7602bdbc4dbb234b27',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          job: 'Copyright',
          name: 'Jie Yan Song'
        }
      ],
      rating: 5,
      reviews: [
        {
          id: '5f0366cd843161f193ebadd4',
          author: {
            avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
            name: 'Marcus Finn'
          },
          comment: 'Great company, providing an awesome & easy to use product.',
          createdAt: subHours(now, 2).getTime(),
          value: 5
        },
        {
          id: 'to33twsyjphcfj55y3t07261',
          author: {
            avatar: '/static/mock-images/avatars/avatar-miron_vitold.png',
            name: 'Miron Vitold'
          },
          comment: 'Not the best people managers, poor management skills, poor career development programs. Communication from corporate & leadership isn\'t always clear and is sometime one-sided. Low pay compared to FANG.',
          createdAt: subHours(now, 2).getTime(),
          value: 2
        },
        {
          id: '6z9dwxjzkqbmxuluxx2681jd',
          author: {
            avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
            name: 'Carson Darrin'
          },
          comment: 'I have been working with this company full-time. Great for the work life balance. Cons, decentralized decision making process across the organization.',
          createdAt: subHours(now, 2).getTime(),
          value: 4
        }
      ],
    };

    return Promise.resolve(project);
  }
}

export const projectApi = new ProjectApi();
