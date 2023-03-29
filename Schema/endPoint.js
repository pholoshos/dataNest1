// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const apiSchema = new mongoose.Schema({
  method: { type: String, required: true,unique: true },
  handler: { type: String, required: true },
  path: { type: String, required: true },
  description : String,
  example : {
    type: String,
    default : `
    {
      "data" : "value"
    }`
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now, // optional default value
  },
  createdBy: String,
});

// Create a model from the schema
const EndPoint = mongoose.model("endPoint", apiSchema);

// Export the model
module.exports = EndPoint;
