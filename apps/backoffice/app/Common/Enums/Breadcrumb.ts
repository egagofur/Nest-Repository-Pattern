import { Route } from '../Route/Route';

const Dashboard = {
    INDEX: [
        {
            label: 'Dashboard',
            path: '/',
        },
    ],
};

const Profile = {
    INDEX: [
        {
            label: 'Profile',
            path: '/profile',
        },
    ],

    EDIT: [
        {
            label: 'Profile',
            path: '/profile',
        },
        {
            label: 'Edit Profile',
            path: '/profile/edit/',
        },
    ],

    EDITPASSWORD: [
        {
            label: 'Profile',
            path: '/profile',
        },
        {
            label: 'Edit Password',
            path: '/profile/edit/password',
        },
    ],
};

const Permissions = {
    INDEX: [
        {
            label: 'Permission Lists',
            path: Route.Permissions,
        },
    ],
    DETAIL: [
        {
            label: 'Permission Lists',
            path: Route.Permissions,
        },
        {
            label: 'Permission Detail',
            path: '#',
        },
    ],
};

const Roles = {
    INDEX: [
        {
            label: 'Roles Lists',
            path: '/roles',
        },
    ],
    DETAIL: [
        {
            label: 'Roles List',
            path: Route.Roles,
        },
        {
            label: 'Role Detail',
            path: '#',
        },
    ],
    CREATE: [
        {
            label: 'Roles Lists',
            path: Route.Roles,
        },
        {
            label: 'New Role',
            path: '/roles/create',
        },
    ],
    EDIT: [
        {
            label: 'Roles Lists',
            path: Route.Roles,
        },
        {
            label: 'Edit Role',
            path: '/roles/edit/:id',
        },
    ],
};

const LogActivity = {
    INDEX: [
        {
            label: 'Logs',
            path: '/logs',
        },
    ],

    DETAIL: [
        {
            label: 'Logs',
            path: '/logs',
        },
        {
            label: 'Log Detail',
            path: '/logs/detail',
        },
    ],
};

const Users = {
    INDEX: [
        {
            label: 'User Lists',
            path: '/users',
        },
    ],
    DETAIL: [
        {
            label: 'User Lists',
            path: '/users',
        },
        {
            label: 'Detail User',
            path: '/users/detail',
        },
    ],
    CREATE: [
        {
            label: 'User Lists',
            path: '/users',
        },
        {
            label: 'Add New User',
            path: '/users/create',
        },
    ],
    EDIT: [
        {
            label: 'User Lists',
            path: '/users',
        },
        {
            label: 'Edit User',
            path: '#',
        },
    ],
};

const Notification = {
    INDEX: [
        {
            label: 'Notification',
            path: '/notifications',
        },
    ],

    DETAIL: [
        {
            label: 'Notification',
            path: '/notifications',
        },
        {
            label: 'Notification Detail',
            path: '/notifications/detail',
        },
    ],
};

export const Breadcrumbs = {
    Users,
    Profile,
    Dashboard,
    Permissions,
    Roles,
    LogActivity,
    Notification,
};
