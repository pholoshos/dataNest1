const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();

const configRoute = require("./routes/apis");
const apiRoute = require("./routes/api");
const dynamicRouter = require("./core/dynamicRouter");

const json = JSON.parse(fs.readFileSync("core/config/apiSource/output.json"));

app.use(bodyParser.json());
// Loop through the endpoint configuration and create the endpoints

dynamicRouter(app,json.endPoints);

app.use("/config", configRoute);
app.use("/api", apiRoute);

// Start the server
app.listen(3000, () => console.log("Server started"));

mongoose
  .connect(
    "mongodb+srv://pholosho:Victor03@datanest.dkyoyei.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected!"));
