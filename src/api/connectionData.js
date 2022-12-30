//
// API endpoints to smartmaster client server
//
export const serverConnection = {
    // server base url -- NEED TO MAKE THIS AUTOMATIC
    baseUrl: 'http://localhost:6543',
    baseUrlDev: 'http://localhost:6543',
    baseUrlProd: 'https://api.mysmartmaster.com',

    slash: '/',

    // Auth API
    loginUrl: '/api/sm/login',
    registerUrl: '/api/sm/register',
    authUrl: '/api/sm/auth',
    meUrl: '/api/sm/client',
    avatarUrl: '/api/sm/client/avatar',

    // Chat API
    chatUrl: '/api/sm/chat',

    // Kanban API
    actionUrl: '/api/sm/action',
    actionClientUrl: '/api/sm/action/client',
    projectClientUrl: '/api/sm/action/project',
    commentClientUrl: '/api/sm/action/comment',

    // Notification API
    notificationUrl: '/api/sm/notification',

    // Order API
    orderClientUrl: '/api/sm/order',

    // Project API
    fileUrl: '/api/sm/document',
    clientUrl: '/api/sm/project/client',
    caseUrl: '/api/sm/project',

    // Message API
    messageUrl: '/api/purple/message',
    messageAccountUrl: '/api/purple/message/acc',

    // Org Account API
    orgUrl: '/api/purple/account',
    logoUrl: '/api/purple/account/logo',

    // Activity log API
    activityLogUrl: '/api/sm/activity',
};
