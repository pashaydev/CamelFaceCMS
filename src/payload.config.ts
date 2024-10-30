import { lexicalEditor } from "@payloadcms/richtext-lexical"; // beta
import path from "path";
import Posts from "./collections/Posts";
import AdminUsers from "./collections/AdminUsers";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { gcsAdapter } from "@payloadcms/plugin-cloud-storage/gcs";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { viteBundler } from "@payloadcms/bundler-vite";
import { buildConfig } from "payload/config";

import Media from "./collections/Media";
import Users from "./collections/Users";
import Categories from "./collections/Category";

import dotenv from "dotenv";
dotenv.config();

//GCS Adapter
const adapter = gcsAdapter({
    bucket: process.env.GCS_BUCKET,
    options: {
        credentials: JSON.parse(process.env.GCS_CREDENTIALS || "{}"),
    },
});

export default buildConfig({
    editor: lexicalEditor({}),
    serverURL: process.env.SERVER_URL,
    admin: {
        bundler: viteBundler(),
        user: "admin-users",
    },
    db: mongooseAdapter({
        url: process.env.MONGODB_URI,
    }),
    collections: [Posts, AdminUsers, Users, Media, Categories],
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
        "https://camelface.vercel.app",
        "https://camelface-old-wildflower-6184.fly.dev",
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
