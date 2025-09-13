const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Feedbacks = mongoose.model("Feedbacks" , feedbackSchema);
module.exports = Feedbacks;