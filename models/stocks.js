const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  likes: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Stock", stocksSchema);