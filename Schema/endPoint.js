// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const apiSchema = new mongoose.Schema({
  method: String,
  handler: String,
  path: String,
});

// Create a model from the schema
const EndPoint = mongoose.model('endPoint', apiSchema);

// Export the model
module.exports = EndPoint;
