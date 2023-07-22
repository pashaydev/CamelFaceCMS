import { onlyAdmins } from './access/isSelf';
import { CollectionConfig } from 'payload/types';

const AdminUsers: CollectionConfig = {
    slug: 'admin-users',
    auth: true,
    labels: { plural: 'Admins' },
    admin: {
        useAsTitle: 'email',
        group:'Administration'
    },
    access: {
        read: onlyAdmins,
    },
    fields: [
        // Email added by default
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'adminAvatar',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'active',
            type: 'checkbox',
        },
        {
            name: 'role',
            type: 'select',
            required: true,
            options: [
                {
                    value: 'admin',
                    label: 'Admin',
                },
            ],
        },
        {
            name: 'fullname',
            type: 'text',
        },
    ],
};

export default AdminUsers;
