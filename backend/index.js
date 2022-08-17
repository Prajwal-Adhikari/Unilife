const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');  //.env file
const userRoute = require("./routes/users.js")
const authRoute = require("./routes/auth.js")

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL) //connecting to the database
    .then(()=>console.log("DBConnection Successful !!"))
    .catch((err)=> {
    console.log(err);
    });

    app.use(express.json());
    app.use("/api/auth",authRoute)
    app.use("/api/users", userRoute);

app.listen(8080, ()=>
{
    console.log("Backend Server is running");
});