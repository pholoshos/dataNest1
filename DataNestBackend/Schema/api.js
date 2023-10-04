// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const mainApiSchema = new mongoose.Schema({
  name: String,
  description: String,
  path: String,
  createdDate :  {
    type: Date,
    required: true,
    default: Date.now // optional default value
  },
  createdBy : String
});

// Create a model from the schema
const MainApi = mongoose.model('MainApi', mainApiSchema);

// Export the model
module.exports = MainApi;
