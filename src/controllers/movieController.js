const { default: axios } = require("axios");
const { API_KEY } = require("../config");
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

exports.getTrendingMovies = async(req,res) => {
  try {
    const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/trending/a;;/week?api_key=${API_KEY}&language=en-US`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }

}

exports.getNetflixMovies = async(req,res) =>{
  try {
    const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }

}

exports.topRatedMovies = async(req,res) => {
  try {
    const fetchedMovies = await axios.get( `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: error,
    });
  }
}

exports.actionMovies = async(req,res) => {
  try {
    const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }

}

exports.comedyMovies = async(req,res) => {
  try {
    const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
}

exports.horrorMovies = async(req,res) => {
  try {
    const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
}

exports.romanticMovies = async(req,res) => {
  try {
    const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
}

exports.documentaries = async(req,res) => {
  try {
    const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`);
    const {data}  = fetchedMovies;
    res.status(200).json({
      data 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
}