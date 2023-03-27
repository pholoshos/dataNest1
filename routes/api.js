const express = require("express");
const fs = require('fs');
const EndPoint = require("../Schema/endPoint");
const router = express.Router();

router.post("/generate",  async (req, res) => {
    const endPoints = await EndPoint.find({});
    fs.writeFile('output.json', JSON.stringify({endPoints}), (err) => {
        if (err) throw err;
        console.log('endpoints written to file',endPoints);
      });
    res.send("config file");
});

module.exports = router;