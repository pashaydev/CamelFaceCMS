import { CollectionConfig } from "payload/types";

const Countries: CollectionConfig = {
    slug: "countries",
    admin: {
        defaultColumns: ["name", "image"],
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
            name: "image",
            type: "upload",
            relationTo: "media",
        },
    ],
};

export default Countries;
