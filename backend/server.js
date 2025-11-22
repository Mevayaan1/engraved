  import express from "express";
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  import cors from "cors";

  // routes imports 

  import productRoutes from "./routes/productRoutes.js";
  import uploadRoutes from "./routes/uploadRoutes.js";
  import authRoutes from "./routes/auth.js";
  import profileRoutes from "./routes/profile.js";
  import cartRoutes from "./routes/cart.js";
  import orderRoutes from "./routes/orderRoutes.js";


  import adminRouter from "./routes/adminRoutes.js";

  dotenv.config();

  const app = express();

  const allowedOrigins = [
    'http://localhost:5173',
    "https://engraved-gamma.vercel.app",
  ];
  // CORS Configuration 
  app.use(cors({
    origin: function (origin, callback){
      if(!origin || allowedOrigins.includes(origin)){
        callback(null,true);
      }
      else{
        callback(new Error(" not allowed  by CORS"))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

  const port = process.env.PORT || 5000;

  // routes 

  app.use(express.json());  

  // Auth routes
  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);

  // Route Configuration
  app.use("/api/products", productRoutes);
  app.use('/api/upload', uploadRoutes);

  // cart routes
  app.use("/api/cart", cartRoutes);

  // order routes 
  app.use("/api/orders", orderRoutes);

  app.use("/api/admin", adminRouter);



  mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log("✅ MongoDB connected");
      app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
      console.log(`DB Name: ${conn.connection.name}`);
    })
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
