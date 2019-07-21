'use strict';
const express = require('express');
const router = express.Router();
const spoty = require('../spotifyCredentials');

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const tracklistObj = await spoty.getAlbumTracks(id);
    res.render('tracklist', { tracklist: tracklistObj.body.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
