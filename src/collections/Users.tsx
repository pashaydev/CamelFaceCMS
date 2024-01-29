import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
    slug: "users", // specify your own slug
    labels: {
        plural: "Users",
    },
    access: {
        read: () => true,
        delete: () => true,
        create: () => true,
        update: () => true,
    },
    admin: {
        useAsTitle: "email",
        defaultColumns: ["_id", "email", "username", "fullname", "isDeleted", "delete"],
        group: "Platform",
    },

    fields: [
        {
            name: "username",
            type: "text",
        },
        {
            name: "email",
            type: "text",
        },
        {
            name: "fullname",
            type: "text",
        },
        {
            name: "bio",
            type: "text",
        },
        {
            name: "isDeleted",
            type: "date",
        },
    ],
    timestamps: false,
};

export default Users;
