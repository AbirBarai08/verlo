const ExpressError = require("../Utils/ExpressError.js");
const crypto = require('crypto');
const Otps = require("../models/otp.js");
const sendEmail = require("../Utils/sendEmail.js");
const Users = require("../models/user.js");
const passport = require("passport");
const mongoose = require('mongoose');

module.exports.signupUser = async(req , res) => {
    const { username, email, password } = req.body;
    const user = await Users.findOne({ email: email }) 
    if(user) {
        return res.status(400).json({message: "Email must be unique" , type: "error"})
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otps.deleteMany({ email : email });
    await Otps.create({ email , otp: hashedOtp , expiresAt });

    req.session.pendingSignup = { username , email , password };
    req.session.save();

    await sendEmail(email , `Your VERLO signup OTP is ${otp}`);
    return res.status(200).json({ message: "OTP sent to your email" , type: "info"});
}

module.exports.verifySignupUser = async(req , res) => {
    const { otp } = req.body;
    const pendingSignup = req.session.pendingSignup;
    const likedItemsBeforeLogin = req.session.likedItems;
    const cartItemsBeforeLogin = req.session.cartItems;

    if(!pendingSignup) {
        return res.status(400).json({message: "session expired" , type: "error"})
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const record = await Otps.findOne({ email: pendingSignup.email , otp: hashedOtp });

    if(!record || record.expiresAt < new Date()) {
        return res.status(400).json({message: "Invalid or expired OTP" , type: "error"})
    }

    await Otps.deleteMany({ email : pendingSignup.email });

    const isAdmin = pendingSignup.email === process.env.ADMIN_EMAIL;
    const newUser = new Users({ username: pendingSignup.username , email: pendingSignup.email , type: isAdmin ? "admin" : "buyers"});
    const registeredUser = await Users.register(newUser, pendingSignup.password);

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
    passport.authenticate("local" , async(err , user, info) => {
        if(err || !user) {
            return res.status(400).json({message: "Invalid credentials" , type: "error"})
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await Otps.deleteMany({ email : user.email });
        await Otps.create({ email: user.email , otp: hashedOtp , expiresAt });

        req.session.pendingLogin = { userId : user._id};
        req.session.save();

        await sendEmail(user.email , `Your VERLO login OTP is ${otp}`);
        return res.status(200).json({ message: "OTP sent to your email" , type: "info"});
    })(req, res);
}

module.exports.verifyLoginUser = async(req , res) => {
    const { otp } = req.body;
    const pendingLogin = req.session.pendingLogin;
    const likedItemsBeforeLogin = req.session.likedItems;
    const cartItemsBeforeLogin = req.session.cartItems;

    if(!pendingLogin) {
        return res.status(400).json({message: "session expired" , type: "error"})
    }

    const user = await Users.findById(pendingLogin.userId);
    if(!user) {
        return res.status(404).json({message: "user not found" , type: "error"})
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const record = await Otps.findOne({ email: user.email , otp: hashedOtp });

    if(!record || record.expiresAt < new Date()) {
        return res.status(400).json({message: "Invalid or expired OTP" , type: "error"})
    }

    await Otps.deleteMany({ email : user.email });
    req.session.pendingLogin = null;

    req.login(user , async(err) => {
        if(err) {
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
}

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