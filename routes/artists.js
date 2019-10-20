const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { artist: 'spotify' });
});

module.exports = router;