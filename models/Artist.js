'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] // ENUM - to give options available, as an array (e.g. here levels of difficulty)
  },
  ingredients: {
    type: Array
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: new Date() // by default - today!!! Or: Date.now() BTW what is timestamp??
  }
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
