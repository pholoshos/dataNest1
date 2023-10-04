const express = require("express");
const EndPoint = require("../Schema/endPoint");
const router = express.Router();
const fs = require("fs");
const nonEmpty = require("../utils/nonEmpty");
const axios = require("axios");

router.get("/", (req, res) => {
  res.send("config file");
});

router.get("/apis", async (req, res) => {
  const data = await EndPoint.find({});
  res.json(data);
});

router.post("/apis", (req, res) => {
  const { path, method, handler } = req.body;
  if (nonEmpty(path) && nonEmpty(method) && nonEmpty(handler)) {
    const endpoint = EndPoint.create({
      method: method,
      handler: handler,
      path: path,
    });
    res.json(endpoint);
  } else {
    res.status(500).json('error');
  }
});

router.post("/ai", async (req, res) => {
  const { message } = req.body;
  const openaiApiKey = "";

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo-0301",
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ result:reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/generate", async (req, res) => {
  const endPoints = await EndPoint.find({});
  fs.writeFile(
    "core/config/apiSource/endpoints.json",
    JSON.stringify({ endPoints }),
    (err) => {
      if (err) throw err;
      console.log("endpoints written to file", endPoints);
    }
  );
  res.send("config file");
});

module.exports = router;
