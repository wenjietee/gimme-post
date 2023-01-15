require("dotenv").config();
const express = require("express");
const app = express();
const PostRoutes = require("./routes/PostRoutes");

// CONFIG
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.use("/", PostRoutes);

// LISTEN
app.listen(PORT, () => {
    console.log(`Gimme-Post listening on port: ${PORT}`);
});
