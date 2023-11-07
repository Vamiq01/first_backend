// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})





connectDB()
    .then(() => {
        try {
            const port = process.env.PORT || 8000;

            app.listen(port, () => {
                console.log(`Server is running at port : ${port}`)
            })
        }
        catch (err) {
            console.log("Server connection failed error : ", err);

        }
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!! ", err);
    })


// const app = Express();
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("Error",(error)=>{
//             console.log("Error : " ,error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is Listening on Port ${process.env.PORT}`);
//         })
//     }
//     catch (error) {
//         console.log("Error : ", error);
//         throw error;
//     }

// })();