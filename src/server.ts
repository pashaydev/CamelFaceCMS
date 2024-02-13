import express from "express";
import payload from "payload";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { join } from "path";

require("dotenv").config();
const app = express();
const server = createServer(app);
const io = new Server(server);

// Redirect root to Admin panel
app.get("/", (_, res) => {
    res.redirect("/admin");
});

app.get("/reset-password", async (_, res) => {
    const json = await resetPassword();
    res.send(json);
});

let users = {};

io.on("connection", socket => {
    console.log("a user connected");

    socket.on("join", data => {
        users[socket.id] = {
            id: socket.id,
            ...data,
        };
        console.log(users);
        io.emit("users", users);
    });

    socket.on("message", data => {
        console.log(data);
        io.emit("message", data);
    });

    socket.on("leave", data => {
        console.log(data);
        delete users[socket.id];
        io.emit("users", users);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        delete users[socket.id];
    });

    socket.on("mousemove", data => {
        console.log(data);
        users[socket.id].x = data.x;
        users[socket.id].y = data.y;
        io.emit("users", users);
    });
});

const resetPassword = async () => {
    const token = await payload.forgotPassword({
        collection: "admin-users",
        data: {
            email: "yakubovskypasha@gmail.com",
        },
        disableEmail: false, // you can disable the auto-generation of email via local API
    });

    const res = await fetch(`https://travelblogcms.onrender.com/api/admin-users/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
            password: "Aasdasd213vvv123",
        }),
    });

    const json = await res.json();
    return json;
};

app.use(
    cors({
        origin: [
            "https://travel-blog-front-kappa.vercel.app",
            "http://localhost:5173",
            "https://camelface.vercel.app",
        ],
    })
);

const start = async () => {
    // Initialize Payload
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        mongoURL: process.env.MONGODB_URI,
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    // Add your own express routes here
    server.listen(process.env.PORT ?? 3000);
};

start();
