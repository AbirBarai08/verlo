const express = require('express');
const router = express.Router();
const wrapAsync = require("../Utils/wrapAsync.js");          //wrapAsync is a function that handle errors without stop server
const isLoggedin = require("../middleware/isLoggedin.js");
const validateProduct = require("../middleware/validateProduct.js");
const multer = require("multer");
const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });
const validateHeroImage = require('../middleware/validateHeroImage.js');
const productController = require("../controllers/product.js");

// Product Browsing
router.get("/", wrapAsync(productController.catagoryProducts));
router.get("/search", wrapAsync(productController.searchProducts));
router.get("/allproducts", wrapAsync(productController.allProducts));

// Wishlist
router.get("/wishlist", wrapAsync(productController.wishlistProductsIds));
router.post("/wishlist", wrapAsync(productController.getWishlistProducts));
router.post("/wishlist/add", wrapAsync(productController.addWishlistProducts));

// Cart
router.get("/cart", wrapAsync(productController.cartProductsIds));
router.post("/cart", wrapAsync(productController.getCartProducts));
router.post("/cart/add", wrapAsync(productController.addCartProducts));
router.patch("/cart", wrapAsync(productController.updateCartProducts));
router.delete("/cart", wrapAsync(productController.deleteCartProducts));

// Product Management
router.post("/addproduct", isLoggedin, upload.array("images", 6), validateProduct, wrapAsync(productController.addProducts));
router.get("/showproducts", isLoggedin, wrapAsync(productController.showAddedProducts));
router.patch("/updateproduct", isLoggedin, upload.array("images", 6), validateProduct, wrapAsync(productController.updateProducts));
router.delete("/deleteproduct/:id", isLoggedin, wrapAsync(productController.deleteProducts));

// Hero Image
router.post("/addheroimage", isLoggedin, upload.single('image'), validateHeroImage, wrapAsync(productController.addHeroImages));

// Orders
router.post("/buyproduct", isLoggedin, wrapAsync(productController.buyProducts));
router.post("/buycartproducts", isLoggedin, wrapAsync(productController.buyCartProducts));
router.get("/orderitems", isLoggedin, wrapAsync(productController.getOrderProducts));
router.delete("/deleteorder/:productId", isLoggedin, wrapAsync(productController.deleteOrderProducts));

//fetchproduct
router.get("/:id", wrapAsync(productController.fetchProduct));

module.exports = router;