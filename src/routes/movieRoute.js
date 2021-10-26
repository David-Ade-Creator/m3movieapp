const express = require("express");
const router = express.Router();
const {verifyAccessToken} = require("../util")

const {
    addRemoveFavourites,
    getFavouriteMovies,
    getTrendingMovies,
    getNetflixMovies,
    topRatedMovies,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanticMovies,
    documentaries
} = require("../controllers/movieController.js");

router.get("/favourites",  verifyAccessToken , getFavouriteMovies);

router.post("/favourites", verifyAccessToken , addRemoveFavourites);

router.get("/trending", getTrendingMovies);

router.get("/netflix", getNetflixMovies);

router.get("/toprated", topRatedMovies);

router.get("/action", actionMovies);

router.get("/comedy", comedyMovies);

router.get("/horror", horrorMovies);

router.get("/romance", romanticMovies);

router.get("/documentary", documentaries);

module.exports = router;