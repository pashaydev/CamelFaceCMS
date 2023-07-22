import { CollectionConfig } from "payload/types";

import { CollectionBeforeOperationHook } from "payload/types";
import slugify from "slugify";

export const formatFilename: CollectionBeforeOperationHook = async ({ args }) => {
    if (args?.req?.files?.file?.name) {
        args.req.files.file.name = slugify(args.req.files.file.name);
    }
    return args;
};

const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
    },
    admin: {
        group: "Blog",
    },
    upload: {
        staticURL: "/media",
        staticDir: "media",
        formatOptions: {
            format: "webp",
        },
        disableLocalStorage: true,
        adminThumbnail: ({ doc }) =>
            `https://storage.googleapis.com/travel-blog/media/${doc.filename}`,
        mimeTypes: ["image/*"],
    },
    fields: [],
    hooks: {
        beforeOperation: [formatFilename],
    },
};

export default Media;
