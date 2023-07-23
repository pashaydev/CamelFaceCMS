import { buildConfig } from "payload/config";
import path from "path";
import Posts from "./collections/Posts";
import AdminUsers from "./collections/AdminUsers";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { gcsAdapter } from "@payloadcms/plugin-cloud-storage/gcs";
import dotenv from "dotenv";
import Media from "./collections/Media";
import Comments from "./collections/Comments";
import Users from "./collections/Users";
import Categories from "./collections/Category";
import Countries from "./collections/Countries";
dotenv.config();
//GCS Adapter
const adapter = gcsAdapter({
    bucket: process.env.GCS_BUCKET,
    options: {
        credentials: JSON.parse(process.env.GCS_CREDENTIALS || "{}"),
    },
});

export default buildConfig({
    serverURL: process.env.SERVER_URL,
    admin: {
        user: AdminUsers.slug,
    },
    collections: [Posts, AdminUsers, Users, Media, Comments, Categories, Countries],
    upload: {
        limits: {
            fileSize: 5000000, // 5MB, written in bytes
        },
    },
    csrf: [
        // whitelist of domains to allow cookie auth from
        `http://localhost:5173`,
        `http://localhost:${process.env.PORT || 3000}`,
        "https://travelblogcms.onrender.com",
    ],
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    },
    plugins: [
        cloudStorage({
            collections: {
                media: {
                    adapter, // init cloud storage
                    disablePayloadAccessControl: true,
                    prefix: "media",
                    generateFileURL: file => {
                        return `https://storage.googleapis.com/${process.env.GCS_BUCKET}/media/${file.filename}`;
                    },
                },
            },
        }),
    ],
});
