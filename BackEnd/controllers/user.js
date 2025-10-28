const ExpressError = require("../Utils/ExpressError.js");
const Users = require("../models/user.js");
const passport = require("passport");
const mongoose = require('mongoose');

module.exports.signupUser = async(req , res) => {
    const { username, email, password } = req.body;
    const existingUser = await Users.findOne({ email: email })
    if(existingUser) {
        return res.status(400).json({message: "Email must be unique" , type: "error"})
    }

    const isAdmin = email === process.env.ADMIN_EMAIL;
    const newUser = new Users({ username, email, type: isAdmin ? "admin" : "buyers"});
    const registeredUser = await Users.register(newUser, password);

    const likedItemsBeforeLogin = req.session.likedItems;
    const cartItemsBeforeLogin = req.session.cartItems;

    req.login(registeredUser , async(err) => {
        if(err) {
            return res.status(500).json({ message: "Please login again" , type: "error" });
        }

        if(Array.isArray(likedItemsBeforeLogin) && likedItemsBeforeLogin.length > 0) {
            registeredUser.wishlist = [...new Set([...registeredUser.wishlist , ...likedItemsBeforeLogin])];
            delete req.session.likedItems;
        }

        if(Array.isArray(cartItemsBeforeLogin) && cartItemsBeforeLogin.length > 0) {
            cartItemsBeforeLogin.forEach(sessionItem => {
                const existingItem = registeredUser.cart.find(item => item.id.toString() === sessionItem.id.toString())
                
                if(existingItem) {
                    existingItem.quantity += sessionItem.quantity;
                } else {
                    registeredUser.cart.push({ id: sessionItem.id , quantity: sessionItem.quantity });
                }
            })
            delete req.session.cartItems;
        }

        await registeredUser.save();
        return res.status(200).json({message: `Welcome to VERLO! ${registeredUser.username}` , type:"success"});
    })
}

module.exports.loginUser = async(req , res) => {
    passport.authenticate("local" , async(err , user) => {
        if(err || !user) {
            return res.status(400).json({message: "Invalid credentials" , type: "error"})
        }

        const likedItemsBeforeLogin = req.session.likedItems;
        const cartItemsBeforeLogin = req.session.cartItems;

        req.login(user , async(loginErr) => {
            if(loginErr) {
                return res.status(500).json({ message: "Login failed" , type: "error" });
            }

            if(user.email === process.env.ADMIN_EMAIL && user.type !== "admin"){
                user.type = "admin"
            }

            if(Array.isArray(likedItemsBeforeLogin) && likedItemsBeforeLogin.length > 0) {
                user.wishlist = [...new Set([...user.wishlist , ...likedItemsBeforeLogin])];
                delete req.session.likedItems;
            }

            if(Array.isArray(cartItemsBeforeLogin) && cartItemsBeforeLogin.length > 0) {
                cartItemsBeforeLogin.forEach(sessionItem => {
                    const existingItem = user.cart.find(item => item.id.toString() === sessionItem.id.toString())
                    
                    if(existingItem) {
                        existingItem.quantity += sessionItem.quantity;
                    } else {
                        user.cart.push({ id: sessionItem.id , quantity: sessionItem.quantity });
                    }
                })
                delete req.session.cartItems;
            }

            await user.save();
            return res.status(200).json({message: `Welcome back ${user.username}` , type:"success"});
        })
    })(req, res);
}
// Deprecated OTP verification endpoints removed

module.exports.getUser = async(req , res , next) => {
    const user = req.session.user;

    if(!user) {
        throw new ExpressError(400 , "User not found")
    }
    return res.status(200).json(user);
}

module.exports.addUserAddress = async (req , res) => {
    const { city , landmark , district , state , pincode , id } = req.body;
    const user = await Users.findOne({ _id : id });

    if(!user) {
        throw new ExpressError(404 , "User not found");
    }
    
    user.address = {city , landmark , district , state , pincode};
    await user.save();

    return res.status(200).json({ message: "Address stored" , type: "success" });
}

module.exports.updateUserAddress = async(req , res) => {
    const { city , landmark , district , state , pincode , id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(404 , "User not found");
    }
    
    const updatedUser = await Users.findByIdAndUpdate(
        id,
        {
            $set: {
                address: { city, landmark, district, state, pincode }
            }
        },
        {
            new: true,               //returns the updated document 
            runValidators: true     //ensure schema validation
        }
    );

    if (!updatedUser) {
        throw new ExpressError(404 , "User not found");
    }
    return res.status(200).json({ message: "Address updated successfully", type: "success" });
}

module.exports.upgradeUserToSeller = async(req , res) => {
    const { id } = req.body;
    const user = await Users.findById(id);
    if(!user) {
        throw new ExpressError(404 , "User not found");
    }

    if(user.type === "sellers") {
        return res.status(400).json({ message: "User is already a seller" , type: "error" });
    }

    user.type = "sellers";
    await user.save();

    return res.status(200).json({ message: "Upgraded to seller successfully" , type: "success" });
}

module.exports.logoutUser = (req , res) => {
    req.logOut((err) => {
        if(err) { return res.status(500).json({ message: "logout failed" , type: "error"})};
        req.session.destroy();
        return res.status(200).json({ message: "logged out successfully" , type: "success"});
    })
}
