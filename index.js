const express = require("express");
const mongoose = require('mongoose');

const app = express();

const json = `
    [
        {
            "method" : "GET",
            "path" : "/users",
            "handler" : "(req,res)=>res.send('hello world')"

        },
        {
            "method" : "GET",
            "path" : "/places",
            "handler" : "(req,res)=>res.send('places')"

        },
        {
            "method" : "GET",
            "path" : "/william",
            "handler" : "(req,res)=>res.send('i am william')"

        }
    ]

`;

// Read the JSON configuration file
const endpointConfig = JSON.parse(json);

// Loop through the endpoint configuration and create the endpoints
endpointConfig.forEach((endpoint) => {
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

const configRoute = require('./routes/apis');

app.use('/config',configRoute );

// Start the server
app.listen(3004, () => console.log("Server started"));

mongoose.connect('mongodb+srv://pholosho:Victor03@datanest.dkyoyei.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));