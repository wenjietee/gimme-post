require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PostRoutes = require("./routes/PostRoutes");

// CONFIG
const PORT = process.env.PORT || 3000;
const CORS_OPTIONS = {
    origin: process.env.WHITELIST, // whitelist all for dev, to add client URL before deployment
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    "Access-Control-Allow-Credentials": true,
    methods: "GET,HEAD,PUT,POST,DELETE",
};

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(CORS_OPTIONS));

// ROUTES
app.use("/", PostRoutes);

// LISTEN
app.listen(PORT, () => {
    console.log(`Gimme-Post listening on port: ${PORT}`);
});
