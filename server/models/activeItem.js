const mongoose = require("mongoose");

const activeItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  listId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("ActiveItem", activeItemSchema);
