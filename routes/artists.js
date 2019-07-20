'use stric';

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.get('/', (req, res, next) => {
  res.render('artists');
});
/*
router.get('/search', async (req, res, next) => {
  try {
    const searchTerm = req.query; // en req.query recibimos la info del formulario si su método es GET
    console.log(searchTerm); // vemos cómo devuelve el valor de la búsqueda, que es un objeto con title y el valor que queremos
    const title = req.query.title;
    const recipe = await Recipe.findOne({ title });
    console.log(recipe);
    res.render('recipeDetails', recipe);
  } catch (error) {
    next(error);
  }
});
*/

module.exports = router;
