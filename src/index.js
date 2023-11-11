import connectDB from "./db/index.js";
import mongoose from "mongoose"
import Express from "express"
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.PORT)

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });

const app = Express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`); // given database url
    app.on("Error", (error) => {
      console.log("Error : ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is Listening on Port ${process.env.PORT}`); //port 
    });
  } catch (error) {
    console.log("Error : ", error);
    throw error;
  }
})();
