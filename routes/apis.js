const express = require("express");
const EndPoint = require("../Schema/endPoint");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("config file");
});

router.get("/apis", async (req, res) => {
  const data = await EndPoint.find({});
  res.send(data.toString());
});

// create a new account/ user
router.post("/apis", (req, res) => {
  const endpoint = EndPoint.create({
    method: "GET",
    handler: "(req,res)=>{res.send('created')}",
    path: "/app",
  });

  res.send("create:"+endpoint.toString());
});

module.exports = router;
