import { CollectionConfig } from "payload/types";

const Posts: CollectionConfig = {
    slug: "posts",
    admin: {
        defaultColumns: [
            "backgroundImage",
            "video",
            "title",
            "textColor",
            "backgroundColor",
            "author",
            "country",
            "publishedDate",
            "content",
            "category",
            "status",
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
            name: "backgroundImage",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "video",
            type: "upload",
            relationTo: "media",
        },
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
            name: "author",
            type: "relationship",
            relationTo: "users",
            required: true,
        },
        {
            name: "country",
            type: "relationship",
            relationTo: "countries",
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
            name: "status",
            type: "select",
            options: [
                {
                    value: "draft",
                    label: "Draft",
                },
                {
                    value: "published",
                    label: "Published",
                },
            ],
            defaultValue: "draft",
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "slug",
            type: "text",
        },
    ],
};

export default Posts;
