import { CollectionConfig } from "payload/types";

const Posts: CollectionConfig = {
    slug: "posts",
    admin: {
        defaultColumns: [
            "title",
            "textColor",
            "backgroundColor",
            "publishedDate",
            "content",
            "category",
        ],
        useAsTitle: "title",
        group: "Blog",
    },
    access: {
        read: () => true,
        admin: () => true,
    },
    fields: [
        {
            name: "title",
            type: "text",
        },
        {
            name: "textColor",
            type: "text",
            required: true,
        },
        {
            name: "backgroundColor",
            type: "text",
            required: true,
        },

        {
            name: "publishedDate",
            type: "date",
        },
        {
            name: "content",
            type: "textarea",
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
        },
        {
            name: "slug",
            type: "text",
        },
    ],
};

export default Posts;
