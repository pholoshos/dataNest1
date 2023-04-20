const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const configRoute = require("./routes/apis");
const apiRoute = require("./routes/api");
const dynamicRouter = require("./core/dynamicRouter");

const json = JSON.parse(fs.readFileSync("core/config/apiSource/endpoints.json"));

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//use dynamic routes to create api
dynamicRouter(app, json.endPoints);

app.use("/config", configRoute);
app.use("/api", apiRoute);

// Start the server
app.listen(3000, () => console.log("Server started"));

mongoose
    .connect(
        "mongodb+srv://pholosho:Victor03@datanest.dkyoyei.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected!"));
