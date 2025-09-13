const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Reviews = mongoose.model("Reviews" , reviewSchema);
module.exports = Reviews;