import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
    slug: "categories",
    admin: {
        defaultColumns: ["name"],
        useAsTitle: "name",
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
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "media",
            type: "upload",
            relationTo: "media",
        },
    ],
};

export default Categories;
