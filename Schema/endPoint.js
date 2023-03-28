// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const apiSchema = new mongoose.Schema({
  method: String,
  handler: String,
  path: String,
  createdDate :  {
    type: Date,
    required: true,
    default: Date.now // optional default value
  },
  createdBy : String
});

// Create a model from the schema
const EndPoint = mongoose.model('endPoint', apiSchema);

// Export the model
module.exports = EndPoint;
