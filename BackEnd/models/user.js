const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    username : String,
    email : {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    displayName: String,
    type: {
        type: String,
        enum: ["buyers" , "sellers" , "admin"],
        default: "buyers"
    },
    address: {
        city: String,
        landmark: String,
        district: String,
        state: String,
        pincode: String,
    },
    wishlist:[
        {
            type: Schema.Types.ObjectId,
            ref: "Products"
        }
    ],
    cart:[
        {
            id: { type: Schema.Types.ObjectId , ref: "Products" },
            quantity: {
                type: Number,
                default: 1
            },
        }
    ],
    orders: [
        {
            product: { type: Schema.Types.ObjectId , ref: "Products" },
            quantity: {
                type: Number,
                default: 1
            },
            purchaseDate: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

userSchema.plugin(passportLocalMongoose , { usernameField: 'email' });
const Users = mongoose.model("Users" , userSchema);
module.exports = Users;