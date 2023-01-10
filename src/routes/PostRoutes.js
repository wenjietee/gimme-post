const express = require("express");
const router = express.Router();

router.get("/create", (req, res) => {
    res.status(200).send("Testing");
});

router.post("/create", (req, res) => {
    const prompt = req.body.prompt;
    console.log("prompt", prompt);

    // OPEN AI API goes here

    res.status(200).send("Create a post");
});

module.exports = router;
