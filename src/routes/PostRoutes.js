const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/create", (req, res) => {
    res.status(200).send("Testing");
});

router.post("/create", async (req, res) => {
    const prompt = req.body.prompt;

    const openAiHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    // OPEN AI IMAGE
    const openAiImgConfig = {
        url: process.env.OPENAI_IMAGE_URL,
        body: {
            // model: "image-alpha-001",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        },
    };
    const openAiImageRes = await axios.post(
        openAiImgConfig.url,
        openAiImgConfig.body,
        {
            headers: openAiHeaders,
        }
    );

    if (openAiImageRes.error) {
        res.status(500).send(error.message);
        return;
    }

    // // OPEN AI TEXT
    const openAiTextConfig = {
        url: process.env.OPENAI_TEXT_URL,
        body: {
            model: "text-davinci-003",
            prompt: `Caption this image: ${openAiImageRes.data.data[0].url} and generate hashtags for this prompt: ${prompt}`,
            temperature: 0.5,
        },
    };

    const openAiTextRes = await axios.post(
        openAiTextConfig.url,
        openAiTextConfig.body,
        {
            headers: openAiHeaders,
        }
    );

    if (openAiTextRes.error) {
        res.status(500).send(error.message);
        return;
    }

    res.status(200).send({
        image: openAiImageRes.data,
        text: openAiTextRes.data,
    });
});

module.exports = router;
