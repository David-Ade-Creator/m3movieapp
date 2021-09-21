const FavouriteMovie = require("../models/favouriteMovieModel");

exports.addRemoveFavourites = async (req, res) => {
  const {
    backdrop_path,
    id,
    original_language,
    original_title,
    overview,
    poster_path,
    release_date,
    title,
    vote_count,
  } = req.body;
  const user = req.verifiedUser;
  try {
    const movie = await FavouriteMovie.findOne({ id });
    if (!movie) {
      const newMovie = new FavouriteMovie({
        id,
        backdrop_path,
        poster_path,
        title,
        original_title,
        overview,
        vote_count,
        release_date,
        original_language,
        user: user._id,
      });
      const newMovieCreated = await newMovie.save();
      if (newMovieCreated) {
        const resMovie = await FavouriteMovie.findOne({
          _id: newMovieCreated._id,
        }).populate("user");
        res.status(200).json({
          status: "success",
          data: resMovie,
        });
      } else {
        res.status(404).send("Unable to add to favourite");
      }
    } else {
      const deletedMovie = await FavouriteMovie.findByIdAndDelete(movie._id);
      res.status(200).json({
        status: "success",
        data: deletedMovie,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: error,
    });
  }
};

exports.getFavouriteMovies = async (req, res) => {
  const user = req.verifiedUser;
  try {
    const movies = await FavouriteMovie.find({ user: user._id }).populate(
      "user"
    );
    if (movies) {
      res.send(movies);
    } else {
      res.status(404).send({ message: "Movies Not Found." });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
