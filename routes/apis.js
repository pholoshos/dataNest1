const express = require("express");
const EndPoint = require("../Schema/endPoint");
const router = express.Router();
const fs = require("fs");
const nonEmpty = require("../utils/nonEmpty");

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
    res.json({ message: "missing data" });
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
