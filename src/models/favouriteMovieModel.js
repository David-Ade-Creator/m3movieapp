const mongoose = require("mongoose");

const favouriteMovieSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true],
  },
  backdrop_path: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  title: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  vote_count: {
    type: Number,
  },
  original_language: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FavouriteMovie = mongoose.model("FavouriteMovie", favouriteMovieSchema);

module.exports = FavouriteMovie;
