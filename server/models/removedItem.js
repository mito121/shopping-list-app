const mongoose = require("mongoose");

const removedItemSchema = new mongoose.Schema({
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

module.exports = mongoose.model("RemovedItem", removedItemSchema);
