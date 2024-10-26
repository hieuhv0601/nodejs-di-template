const mongoose = require("mongoose");

const ProducerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Producer", ProducerSchema, "producers");
