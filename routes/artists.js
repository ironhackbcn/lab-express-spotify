const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  spotifyApi
    .searchArtists(artistquery)
    .then(data => {
      console.log("You looked for ", artistquery);
      console.log("The received data from the API: ", data.body);
      res.render("artists", { data });
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    });
});

module.exports = router;
