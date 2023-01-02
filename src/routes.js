import { Suspense, lazy } from 'react';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// SmartMaster pages

const Overview = Loadable(lazy(() => import('./pages/dashboard/Overview')));
const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const OrderList = Loadable(lazy(() => import('./pages/dashboard/OrderList')));
const OrderDetails = Loadable(lazy(() => import('./pages/dashboard/OrderDetails')));
const ProjectBrowse = Loadable(lazy(() => import('./pages/dashboard/ProjectBrowse2')));
const ProjectDetails = Loadable(lazy(() => import('./pages/dashboard/ProjectDetails')));
const Chat = Loadable(lazy(() => import('./pages/dashboard/Chat')));
const Calendar = Loadable(lazy(() => import('./pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('./pages/dashboard/Kanban')));
const ContactTech = Loadable(lazy(() => import('./pages/ContactTech')));
const ContactQomo = Loadable(lazy(() => import('./pages/ContactQomo')));

// Authentication pages

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const PasswordRecovery = Loadable(lazy(() => import('./pages/authentication/PasswordRecovery')));
const PasswordReset = Loadable(lazy(() => import('./pages/authentication/PasswordReset')));
const VerifyCode = Loadable(lazy(() => import('./pages/authentication/VerifyCode')));
const Register = Loadable(lazy(() => import('./pages/authentication/Register')));
const Terms = Loadable(lazy(() => import('./pages/document/Terms')));
const Security = Loadable(lazy(() => import('./pages/document/Security')));

// Error pages

const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes = [
  {
    path: 'document',
    children: [
      {
        path: 'terms',
        element: <Terms />
      },
      {
        path: 'security',
        element: <Security />
      }
    ]
  },
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />
      },
      {
        path: 'password-reset',
        element: <PasswordReset />
      },
      {
        path: 'verify-code',
        element: <VerifyCode />
      },
      {
        path: 'terms',
        element: (
            <GuestGuard>
              <Terms />
            </GuestGuard>
          )
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        )
      },
    ]
  },
  {
    path: 'contact',
    element: <ContactTech />
  },
  {
    path: 'vulnerability-reporting',
    element: <ContactTech />
  },
  {
    path: 'contactQomo',
    element: <ContactQomo />
  },
  {
    path: '*',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'calendar',
        element: <Calendar />
      },
      {
        path: 'chat',
        children: [
          {
            path: '/',
            element: <Chat />
          },
          {
            path: 'new',
            element: <Chat />
          },
          {
            path: ':threadKey',
            element: <Chat />
          }
        ]
      },
      {
        path: 'kanban',
        element: <Kanban />
      },
      {
        path: 'orders',
        children: [
          {
            path: 'browse',
            element: <OrderList />
          },
          {
            path: ':oId',
            element: <OrderDetails />
          }
        ]
      },
      {
        path: 'projects',
        children: [
          {
            path: 'browse',
            element: <ProjectBrowse />
          },
          {
            path: ':cid',
            element: <ProjectDetails />
          }
        ]
      },
    ]
  },
  {
    path: 'error',
    element: <MainLayout />,
    children: [
      {
        path: '401',
        element: <AuthorizationRequired />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '500',
        element: <ServerError />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
