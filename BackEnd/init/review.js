const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const reviews = [
  {
    review: "Absolutely loved the product! Great quality and fast delivery.",
    rating: 5,
    owner: new ObjectId('68c3923b85f17d8e9a945edb'),
  },
  {
    review: "Decent value for the price. Packaging could be better.",
    rating: 3,
    owner: new ObjectId('68c3923b85f17d8e9a945edb'),
  },
  {
    review: "Not satisfied. The item was different from the description.",
    rating: 2,
    owner: new ObjectId('68c3923b85f17d8e9a945edb'),
  },
  {
    review: "Works as expected. Will buy again.",
    rating: 4,
    owner: new ObjectId('68c3923b85f17d8e9a945edb'),
  },
  {
    review: "Terrible experience. Customer support was unresponsive.",
    rating: 1,
    owner: new ObjectId('68c3923b85f17d8e9a945edb'),
  },
];

module.exports = { data : reviews };