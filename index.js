const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();

const configRoute = require("./routes/apis");
const apiRoute = require("./routes/api");

const json = JSON.parse(fs.readFileSync("core/config/apiSource/output.json"));

app.use(bodyParser.json());
// Loop through the endpoint configuration and create the endpoints
json.endPoints.forEach((endpoint) => {
  const { method, path, handler } = endpoint;
  const _handler = eval(handler);

  switch (method) {
    case "GET":
      app.get(path, (req, res) => {
        _handler(req, res);
      });
      break;
    case "POST":
      app.post(path, (req, res) => {
        _handler(req, res);
      });
      break;
    case "DELETE":
      app.delete(path, (req, res) => {
        _handler(req, res);
      });
      break;
    case "UPDATE":
      app.put(path, (req, res) => {
        _handler(req, res);
      });
      break;
    default:
      app.get(path, (req, res) => {
        _handler(req, res);
      });
  }
});

app.use("/config", configRoute);
app.use("/api", apiRoute);

// Start the server
app.listen(3000, () => console.log("Server started"));

mongoose
  .connect(
    "mongodb+srv://pholosho:Victor03@datanest.dkyoyei.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected!"));
