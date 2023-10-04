// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  authtoken: String,
  createdDate: {
    type: Date,
    required: true,
    default: Date.now, // optional default value
  },
  companyName: String,
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
