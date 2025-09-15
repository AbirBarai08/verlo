if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const app = express();
const cron = require('node-cron'); //for automatic deletion
const path = require('path');
const MONGO_URL = process.env.MONGO_DB_URL;
const session = require('express-session');                 //session store is used to store details of non login users
const HeroImages = require("./models/heroImg.js");
const Products = require("./models/product.js");
const Users = require("./models/user.js");
const wrapAsync = require("./Utils/wrapAsync.js");          //wrapAsync is a function that handle errors without stop server
const ExpressError = require("./Utils/ExpressError.js");    //ExpressError is for building custom errors
const productsRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const reviewRouter = require("./routes/review.js");
const passport = require("passport");
const MongoStore = require('connect-mongo');
const cloudinary = require('cloudinary').v2;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , "/public")));
app.use('/images', express.static(path.join(__dirname, 'images')));

const corsOptions = {
    origin: 'https://e-commerce-website-2-cvtu.onrender.com',
    credentials: true
};
app.use(cors(corsOptions));

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    collectionName: "sessions",
    ttl: 7 * 24 * 60 * 60
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  }
}
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

require('./config/passport.js');

main()
.then(() => {
    console.log("connect to db");
})
.catch((err) => {
    console.log(err);
});

async function main(){
  await mongoose.connect(MONGO_URL);
}

// Helper to extract publicId from Cloudinary URL
const extractPublicId = (url) => {
  if (!url) return null;
  const parts = url.split('/');
  const filename = parts[parts.length - 1]; // e.g., shoes123.png
  const folder = parts[parts.length - 2];   // e.g., products
  const publicId = `${folder}/${filename.split('.')[0]}`; // e.g., products/shoes123
  return publicId;
};

cron.schedule('0 0 * * *', async () => {
  const now = new Date();

  try {
    const expiredHeroImages = await HeroImages.find({ endDate: { $lt: now } });

    for (const hero of expiredHeroImages) {
      const publicId = extractPublicId(hero.image?.url);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted hero image: ${publicId}`);
        } catch (err) {
          console.error(`Failed to delete hero image ${publicId}:`, err.message);
        }
      }
    }

    const deletedHeroImages = await HeroImages.deleteMany({ endDate: { $lt: now } });

    const cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    try {
      const expiredProducts = await Products.find({ validUntil: { $lt: cutoffDate } });

      for (const product of expiredProducts) {
        for (const image of product.images) {
          const publicId = extractPublicId(image?.url);
          if (publicId) {
            try {
              await cloudinary.uploader.destroy(publicId);
              console.log(`Deleted image: ${publicId}`);
            } catch (err) {
              console.error(`Failed to delete image ${publicId}:`, err.message);
            }
          }
        }
      }
      const deleted = await Products.deleteMany({ validUntil: { $lt: cutoffDate } });
      console.log(`Deleted ${deleted.deletedCount} products after 7-day grace`);
    } catch (err) {
      console.error('Cleanup failed:', err.message);
    }
    console.log(`🧹 Cleanup complete: ${deletedHeroImages.deletedCount} hero images and ${deletedProducts.deletedCount} products deleted`);
  } catch (err) {
    console.error('Cron cleanup failed:', err.message);
  }
});

app.use(async(req , res , next) => {
    if(req.isAuthenticated() && req.user) {
        req.session.user = req.user;
        req.session.save(() => next());
    } else {
        next();
    }
})

app.get("/" , wrapAsync(async (req , res) => {
    const now = new Date();
    const heroImgs = await HeroImages.find({ endDate : { $gte : now }});
    const products = await Products.find({ validUntil: { $gte: now } }).populate("reviews");
    res.json({heroImgs , products});
}))

app.use("/products" , productsRouter);
app.use("/users" , userRouter);
app.use("/reviews" , reviewRouter);

app.all("/{*splat}" , (req , res , next) => {
    next(new ExpressError(404 , "page not found"));
})

app.use((err , req, res, next) => {
    if (res.headersSent) {
        return next(err); // delegate to default Express error handler
    }
    let { status = 500, message = "Internal Server Error" } = err;
    res.status(status).json({
        status: "error",
        statusCode: status,
        message: message
    });
})

app.listen(port , () => {
    console.log(`Server is now listening on port ${port}`);
})