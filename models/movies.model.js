const mongoose = require("mongoose");
require("./producers.model");
require("./directors.model");
require("./stars.model");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    release: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producer",
      required: true,
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Director",
      required: true,
    },
    genres: {
      type: [String],
      required: false,
    },
    stars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Star",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema, "movies");
