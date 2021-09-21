const express = require("express");
const router = express.Router();
const {verifyAccessToken} = require("../util")

const {
    addRemoveFavourites,
    getFavouriteMovies
} = require("../controllers/movieController.js");

router.get("/favourites",  verifyAccessToken , getFavouriteMovies);

router.post("/favourites", verifyAccessToken , addRemoveFavourites);

module.exports = router;