import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config(
    { path: './env' }, 
);

const PORT = process.env.PORT || 8000;

connectDB()
.then( ()=> {

    app.on("error", (err) => {
        console.error("App on error: ", error);
        process.exit(1);
    })

    app.listen(PORT, () => {
        console.log(`listening on port : ${PORT}`);
    })
})
.catch( (err) => {
    console.log("Mongo db connection failed !!! ", err);
})






















/*
import express from "express"
const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        })

        console.log("connected to db");
    } catch (error) {
       console.error("ERROR: ",error);
       throw err
    }
})();
*/