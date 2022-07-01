const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", itemSchema);
