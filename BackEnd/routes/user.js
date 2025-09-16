const express = require('express');
const router = express.Router();
const { signupSchema , loginSchema , addressSchema } = require("../schema/schema.js");
const validateSchema = require("../middleware/validateUser.js");
const wrapAsync = require("../Utils/wrapAsync.js");
const userController = require("../controllers/user.js");
const passport = require("passport");

//signup
router.post("/signup" , validateSchema(signupSchema) , wrapAsync(userController.signupUser))
router.post("/verify-signup" , wrapAsync(userController.verifySignupUser))

//login
router.post("/login" , validateSchema(loginSchema) , wrapAsync(userController.loginUser))
router.post("/verify-login" , wrapAsync(userController.verifyLoginUser))

//google signin
router.get("/auth/google", (req, res, next) => {
    const { redirectUrl } = req.query;

    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
        state: redirectUrl || "/"
    })(req, res, next);
});

router.get("/auth/google/callback" , passport.authenticate("google" , {
    failureRedirect: "https://e-commerce-website-2-cvtu.onrender.com/users/login?error=google"
}),
    wrapAsync(async(req, res) => {
        const prevUrl = req.query.state || "/";
        const user = req.user;

        if(user.email === process.env.ADMIN_EMAIL && user.type !== "admin"){
            user.type = "admin"
        }

        const likedItemsBeforeLogin = req.session.likedItems;
        const cartItemsBeforeLogin = req.session.cartItems;

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
        res.redirect(`/auth/set-cookie?redirect=${prevUrl}`);
    }
))

router.get("/auth/set-cookie", (req, res) => {
  const redirect = req.query.redirect || "/";
  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0; URL='https://e-commerce-website-1-g5ui.onrender.com/oauth-success?redirect=${redirect}'" />
      </head>
      <body>
        <p>Redirecting...</p>
      </body>
    </html>
  `);
});

router.get("/me" , (req , res) => {
    if(!req.isAuthenticated()) {
        return res.status(400).json({ message: "User not authenticated" , type: "error" })
    }

    const { username } = req.user;
    return res.status(200).json({ message: `Wellcome to VERLO! ${username}`, type: "success" });
})

//profile
router.get("/profile" , wrapAsync(userController.getUser))

//address
router.post("/addaddress" , validateSchema(addressSchema) , wrapAsync(userController.addUserAddress))
router.patch("/updateaddress" , validateSchema(addressSchema) , wrapAsync(userController.updateUserAddress))

//seller account
router.post("/upgradetoseller" , wrapAsync(userController.upgradeUserToSeller))

//logout
router.post("/logout" , userController.logoutUser)

module.exports = router;