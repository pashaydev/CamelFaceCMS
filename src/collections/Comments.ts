import { CollectionConfig } from "payload/types";

const Comments: CollectionConfig = {
    slug: "comments",
    admin: {
        defaultColumns: ["author", "comment", "date"],
        useAsTitle: "comment",
        group: "Blog",
    },
    access: {
        read: () => true,
        delete: () => true,
        update: () => true,
        create: () => true,
    },
    fields: [
        {
            name: "comment",
            type: "text",
            required: true,
        },
        {
            name: "author",
            type: "relationship",
            relationTo: "users",
            required: true,
        },
        {
            name: "post",
            type: "relationship",
            relationTo: "posts",
            required: true,
        },
        {
            name: "publishedDate",
            type: "date",
        },
        {
            name: "date",
            type: "date",
        },
    ],
};

export default Comments;
