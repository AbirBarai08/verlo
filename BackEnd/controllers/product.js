const mongoose = require('mongoose');
const Products = require("../models/product.js");
const HeroImages = require("../models/heroImg.js");
const ExpressError = require("../Utils/ExpressError.js");  
const Users = require('../models/user.js');
const { cloudinary } = require("../config/cloudConfig.js");
const { Mongoose } = require('mongoose');
const buildImageUpdateOps = require("../Utils/buildImageUpdateOps.js");


module.exports.catagoryProducts = async (req , res) => {
    const { catagory , minPrice , maxPrice , rating } = req.query;
    const filter = {};

    if(catagory) {
        filter.catagory = decodeURIComponent(catagory);
    }

    if(minPrice || maxPrice) {
        filter.price = {};
        if(minPrice) filter.price.$gte = Number(minPrice);
        if(maxPrice && Number(maxPrice) > 0) filter.price.$lte = Number(maxPrice);
    }

    if(rating && Number(rating) > 0) {
        filter.rating = { $gte: Number(rating) };
    }

    const products = await Products.find(filter);
    res.json(products);
}

module.exports.searchProducts = async (req, res) => {
  const { product, minPrice, maxPrice, rating , catagory , discountType , discountValue } = req.query;

  let productFilter = {};
  if(product) {
    productFilter = {
        $or: [
            { name: { $regex: product, $options: 'i' } },
            { catagory: { $regex: product, $options: 'i' } }
        ]
    };
  }

  const filter = { ...productFilter };

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice && Number(maxPrice) > 0) filter.price.$lte = Number(maxPrice);
  }

  if (rating && parseFloat(rating) > 0) {
    filter.rating = { $gte: parseFloat(rating) };
  }

  if(catagory) filter.catagory = decodeURIComponent(catagory);
  if(discountType) filter.discountType = discountType;
  if(discountValue) filter.discountValue = Number(discountValue);

  const products = await Products.find(filter);

  res.json(products);
}

module.exports.allProducts = async (req , res) => {
    const { minPrice , maxPrice , rating } = req.query;
    const filter = {};

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice && Number(maxPrice) > 0) filter.price.$lte = Number(maxPrice);
    }

    if (rating && Number(rating) > 0) {
        filter.rating = { $gte: Number(rating) };
    }

    const products = await Products.find(filter);
    res.json(products);
}

module.exports.wishlistProductsIds = async (req , res) => {
    if(req.isAuthenticated()) {
        const likedIds = req.user?.wishlist;
        const products = await Products.find({ _id : { $in : likedIds }});
        const validIds = products.map(p => p._id.toString());
        const missingIds = likedIds.filter(id => !validIds.includes(id.toString()));

        if(missingIds.length > 0) {
            await Users.findByIdAndUpdate(req.user._id , {
                $pull : {
                    wishlist : { $in : missingIds }
                }
            })
        }

        return res.json({
            likedItems: validIds,
            message: missingIds.length > 0 && "Some items are no longer available",
            type: missingIds.length > 0 && "info"
        })
    }

    const likedIds = req.session.likedItems;
    if(likedIds) {
        const products = await Products.find({ _id : { $in : likedIds }});
        const validIds = products.map(p => p._id.toString());
        const missingIds = likedIds.filter(id => !validIds.includes(id.toString()));

        if(missingIds.length > 0) {
            req.session.likedItems = validIds
        }

        return res.json({
            likedItems: validIds,
            message: missingIds.length > 0 && "Some items are no longer available",
            type: missingIds.length > 0 && "info"
        })
    }
    return res.json({likedItems: []});
}

module.exports.getWishlistProducts = async (req , res) => {    
    const { ids } = req.body;
    if(!Array.isArray(ids) || ids.length === 0) {
        throw new ExpressError(404 , "Products not found")
    } else {
        const products = await Products.find({ _id : { $in : ids}});
        res.json(products);
    }
}

module.exports.addWishlistProducts = async (req , res) => {
    const { id } = req.body;
    if(!id) {
        throw new ExpressError(404 , "Product is required")
    }
    
    let likedItems;
    let message = "";

    if(req.isAuthenticated()) {
        const user = await Users.findById(req.user._id);
        const idx = user.wishlist.indexOf(id);

        if(idx > -1) {
            user.wishlist.splice(idx , 1);
            message = "Remove from wishlist";
        } else {
            user.wishlist.push(id);
            message = "Added to wishlist";
        }

        await user.save();
        likedItems = user.wishlist;
    } else {
        if(!req.session.likedItems) req.session.likedItems = [];
        const idx = req.session.likedItems.indexOf(id);

        if(idx > -1) {
            req.session.likedItems.splice(idx , 1);
            message = "Removed from wishlist";
        } else {
            req.session.likedItems.push(id);
            message = "Added to wishlist";
        }

        likedItems = req.session.likedItems;
    }
    return res.json({
        likedItems,
        message,
        type: "success"
    });
}

module.exports.cartProductsIds = async (req , res) => {
    if(req.isAuthenticated()) {
        const cartItems = req.user?.cart;
        const ids = cartItems.map(item => item.id);
        const products = await Products.find({ _id: { $in: ids }});
        const foundIds = products.map(p => p._id.toString());
        const filteredCart = cartItems.filter(item => foundIds.includes(item.id.toString())); 
        const missingIds = ids.filter(id => !foundIds.includes(id.toString()));

        if(missingIds.length > 0) {
            await Users.findByIdAndUpdate(req.user._id , {
                $pull : {
                    cart : {
                        id : { $in : missingIds }
                    }
                }
            })
        }

        return res.json({
            cartItems: filteredCart,
            message: missingIds.length > 0 && "Some items are no longer available",
            type: missingIds.length > 0 && "info"
        });
    }

    const cartItems = req.session.cartItems;
    if(cartItems) {
        const ids = cartItems.map(item => item.id);
        const products = await Products.find({ _id: { $in: ids }});
        const foundIds = products.map(p => p._id.toString());
        const filteredCart = cartItems.filter(item => foundIds.includes(item.id.toString())); 
        const missingIds = ids.filter(id => !foundIds.includes(id.toString()));

        if(missingIds.length > 0) {
            req.session.cartItems = filteredCart
        }

        return res.json({
            cartItems: filteredCart,
            message: missingIds.length > 0 && "Some items are no longer available",
            type: missingIds.length > 0 && "info"
        });
    }
    return res.json({ cartItems: [] });
}

module.exports.getCartProducts = async (req , res) => {
    const { ids } = req.body;
    if(!Array.isArray(ids) || ids.length === 0) {
        throw new ExpressError(404 , "Products not found")
    } else {
        const products = await Products.find({ _id : { $in : ids }});
        res.json(products);
    }
}

module.exports.addCartProducts = async (req , res) => {
    const { id } = req.body;
    if(!id) {
        throw new ExpressError(404 , "Product is required")
    }
    
    let cartItems;
    let message = "";
    let type = "";

    if(req.isAuthenticated()){
        const user = await Users.findById(req.user._id);
        const existingItem = user.cart.some(item => item.id.equals(id));

        if(!existingItem) {
            user.cart.push({ id: id , quantity: 1});
        }

        await user.save();
        cartItems = user.cart;
    } else {
        if(!req.session.cartItems) req.session.cartItems = [];

        const existingItem = req.session.cartItems.find(item => item.id === id);

        if(!existingItem) {
            req.session.cartItems.push({ id: id , quantity: 1 });
        }

        cartItems = req.session.cartItems;
    }

    message = "Added to cart";
    type = "success";
    
    return res.json({ cartItems: cartItems , message: message , type: type });
}

module.exports.updateCartProducts = async (req , res) => {
    const { id , quantity } = req.body;
    if(!id || !quantity) {
        throw new ExpressError(404 , "Product or Quantity not found")
    } 

    let cartItems;
    
    if(req.isAuthenticated()){
        const user = await Users.findOneAndUpdate(
            { _id: req.user._id , "cart.id" : id },
            {$set: { "cart.$.quantity" : quantity }},
            { new : true }
        )
        cartItems = user.cart;
    } else {
        const existingItem = req.session.cartItems.find(item => item.id === id);
        existingItem.quantity = quantity;
        cartItems = req.session.cartItems;
    }

    res.json({ cartItems });
}

module.exports.deleteCartProducts = async (req , res) => {
    const { id } = req.body;
    if(!id) {
        throw new ExpressError(404 , "Product not found")
    }
    
    let cartItems;

    if(req.isAuthenticated()) {
        const user = await Users.findByIdAndUpdate(req.user._id , {
            $pull : { cart : { id : id } } },
            { new : true }
        );
        cartItems = user.cart;
    } else {
        req.session.cartItems = req.session.cartItems.filter(item => item.id !== id);
        cartItems = req.session.cartItems;
    }

    return res.json({ cartItems , message: "Removed from cart", type: "success" });
}

module.exports.addProducts = async(req , res) => {
    if(req.files && req.files.length < 6){
        throw new ExpressError(404 , "Images not found")
    }

    let imageData;
    if(req.files && req.files.length > 0) {
        imageData = req.files.map(file => ({
            filename: file.filename || file.originalname,
            url: file.path,
            mimetype: file.mimetype,
            size: file.size
        }));
    }

    let parsedProductData;
    try{
        parsedProductData = JSON.parse(req.body.productData);
    } catch(err) {
        throw new ExpressError(400 , "Invalid product data format")
    }

    const product = new Products({
        ...parsedProductData,
        images: imageData,
        owner: req.user._id,
    })

    await product.save();

    return res.status(200).json({ message: "product added successfully" , type: "success" });
}

module.exports.showAddedProducts = async(req , res) => {
    const userId = req.user._id;
    const user = await Users.findById(userId);

    if(user.type !== "sellers") {
        throw new ExpressError(403 , "To visit this page upgrade to sellers account")
    }

    const products = await Products.find({owner : userId});
    
    return res.status(200).json({ products: products });
}

module.exports.updateProducts = async (req, res) => {
  const id = req.body.id;
  const userId = req.user._id;

  if (!id) throw new ExpressError(404, "Product not found");

  const existingProduct = await Products.findById(id);
  if (!existingProduct) throw new ExpressError(404, "Product not found");

  if (!existingProduct.owner.equals(userId)) {
    throw new ExpressError(403, "You are not the actual owner of this product");
  }

  // Parse indexes
  const indexesRaw = req.body.indexes;
  const indexes = Array.isArray(indexesRaw)
    ? indexesRaw.map(i => parseInt(i, 10)).filter(i => !isNaN(i))
    : [parseInt(indexesRaw, 10)].filter(i => !isNaN(i));

  // Parse product data
  let parsedProductData;
  try {
    parsedProductData = JSON.parse(req.body.productData);
  } catch (err) {
    throw new ExpressError(400, "Invalid product data format");
  }

  // Prepare image updates
  let imageUpdates = {};
  let isImageUpdated = false;

  if (req.files && req.files.length > 0) {
    const newImages = req.files.map(file => ({
      filename: file.filename || file.originalname,
      url: file.path,
      mimetype: file.mimetype,
      size: file.size
    }));

    imageUpdates = buildImageUpdateOps(existingProduct.images, newImages, indexes);
    isImageUpdated = Object.keys(imageUpdates).length > 0;

    // Delete old images from Cloudinary
    indexes.forEach((idx) => {
      const oldImage = existingProduct.images[idx];
      if (oldImage?.filename) {
        cloudinary.uploader.destroy(oldImage.filename).catch(err => {
          console.error("Cloudinary deletion failed:", err);
        });
      }
    });
  }

  // Compare product data
  const isProductDataSame = Object.entries(parsedProductData).every(([key, value]) => {
    return JSON.stringify(existingProduct[key]) === JSON.stringify(value);
  });

  // If nothing changed, skip update
  if (isProductDataSame && !isImageUpdated) {
    return res.status(200).json({ message: "No changes detected", type: "info" });
  }

  // Merge updates
  const updatePayload = {
    ...parsedProductData,
    ...imageUpdates
  };

  // Update product
  const updatedProduct = await Products.findByIdAndUpdate(
    id,
    { $set: updatePayload },
    { new: true, runValidators: true }
  );

  return res.status(200).json({ message: "Product updated successfully", type: "success" });
}

module.exports.deleteProducts = async(req , res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const product = await Products.findById(id);

    if(!product) {
        throw new ExpressError(404 , "Product not found")
    }

    if(!product.owner.equals(userId)) {
        throw new ExpressError(403 , "You are not the actual owner of this product")
    }

    const productImgs = product.images;

    await Promise.all(productImgs.map(img => {
        if (img && img.filename) {
            return cloudinary.uploader.destroy(img.filename);
        }
    }));

    await product.deleteOne();
    return res.status(200).json({ message: "Product deleted successfully" , type: "success" })
}

module.exports.addHeroImages = async(req , res) => {
    if(!req.file) {
        throw new ExpressError(404 , "Image not found")
    }

    let imageData;
    if(req.file) {
        imageData = {
            filename: req.file.filename || req.file.originalname,
            url: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size
        }
    }

    let parsedImageData;
    try{
        parsedImageData = JSON.parse(req.body.imageData);
    } catch(err) {
        throw new ExpressError(400 , "Invalid product data format")
    }

    const heroImage = new HeroImages({
        ...parsedImageData,
        image: imageData,
    })

    await heroImage.save();

    const now = new Date();
    const heroImgs = await HeroImages.find({ endDate : { $gte : now }});
    return res.status(200).json({ heroImgs , message: "Hero Image added successfully" , type: "success" });
}

module.exports.buyProducts = async(req , res) => {
    const { productId , quantity } = req.body;
    const product = await Products.findById(productId);
    const user = await Users.findById(req.user._id);

    if(!product) {
        throw new ExpressError(404 , "Product not found")
    }

    if(!user) {
        throw new ExpressError(404 , "User not found")
    }

    user.orders.push({ product: productId , quantity: quantity });
    await user.save();

    return res.status(200).json({ message: "Order placed successfully" , type: "success" });
}

module.exports.buyCartProducts = async (req, res) => {
  const { items } = req.body;
  if (!items || items.length === 0) {
    return res.status(404).json({ message: "Products not found", type: "error" });
  }

  const user = await Users.findById(req.user._id);
  if (!user) throw new ExpressError(404, "User not found");

  const productIds = items.map(item => new mongoose.Types.ObjectId(item.productId));
  const products = await Products.find({ _id: { $in: productIds } }).populate("owner");

  if (products.length !== items.length) {
    return res.status(400).json({ message: "Some products are invalid", type: "error" });
  }

  for (const item of items) {
    const qty = Number(item.quantity);
    if (!qty || qty <= 0) {
      throw new ExpressError(400, `Invalid quantity for product ${item.productId}`);
    }

    user.orders.push({ product: item.productId, quantity: qty });
  }

  user.cart = [];
  await user.save();

  return res.status(200).json({ message: "Order placed successfully", type: "success" });
}

module.exports.getOrderProducts = async (req, res) => {
    const user = await Users.findById(req.user._id);
    if(!user) {
        return res.status(404).json({ message: "User not found" , type: "error" })
    }
    const orderItems = user.orders;
    if (!orderItems || orderItems.length === 0) {
        return res.status(404).json({ message: "No orders found" });
    }

    const orderProductids = orderItems.map(item => item.product);
    const products = await Products.find({ _id : { $in : orderProductids }});
    const foundIds = products.map(p => p._id.toString());
    const missingIds = orderProductids.filter(id => !foundIds.includes(id.toString()));

    if(missingIds.length > 0) {
        await Users.findByIdAndUpdate(req.user._id , {
            $pull : {
                orders : {
                    product : { $in : missingIds }
                }
            }
        })
    }

    const populatedUser = await Users.findById(req.user._id).populate("orders.product");

    res.status(200).json({ 
        orderItems: populatedUser.orders,
        message: missingIds.length > 0 && "Some items are no longer available",
        type: missingIds.length > 0 && "info"
    });
}

module.exports.deleteOrderProducts = async(req , res) => {
    const { productId } = req.params;
    const product = await Products.findById(productId).populate("owner");

    if(!product) {
        throw new ExpressError(404 , "product not found")
    }

    const user = await Users.findById(req.user._id);
    if(!user) {
        throw new ExpressError(404 , "User not found")
    }

    let qty; 
    for(order of user.orders) {
        if(order.product.equals(productId)) {
            qty = order.quantity
        }
    }

    if (!qty) {
        return res.status(404).json({ message: "Order not found", type: "error" });
    }

    const originalLength = user.orders.length;
    user.orders = user.orders.filter(order => !order.product.equals(productId));

    if (user.orders.length === originalLength) {
        return res.status(404).json({ message: "Order not found", type: "error" });
    }

    await user.save();
    await user.populate("orders.product");

    return res.status(200).json({ orderItems: user.orders });
}

module.exports.fetchProduct = async (req, res) => {
    const ProductId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
        throw new ExpressError(400, "Invalid Product ID format");
    }

    const productDetails = await Products.findById(ProductId)
        .populate({
            path: "reviews",
            populate: { path: "owner" }
        })
        .populate({
            path: "feedbacks",
            populate: { path : "owner" }
        });

    if (!productDetails) {
        throw new ExpressError(404, "Product not found");
    }
    
    return res.json(productDetails);
}