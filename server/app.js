const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route =require("./Route/index");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");

const PORT = 5500;
//const HOSTNAME = "localhost";
const paymentRoute = require("./Controller/payment");
const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

const corsOptions = {
    //origin: 'http://localhost:3000',
    origin: process.env.REACT_URL,
    credentials: true,
    optionSuccessStatus: 200
}


dotenv.config();

//Request Management -connection
const app = express();

app.use(cookieSession({ name: "session", keys:["edureka"], maxAge: 24*60*60*1000 })) //24hrs 60min 60sec 1000ms = 1 day

app.use(express.json());    //a body parser required to post a data
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use('/', route);
app.use('/api/payment/', paymentRoute);     //Razorpay Payment Gateway
app.use('/auth', authRoute);


// DB
//const MongoAtlas = "mongodb+srv://admin:g9EGYylIV4IE1jcD@zomato0.salxpjp.mongodb.net/Zomato-11?retryWrites=true&w=majority&appName=Zomato0";

const MongoAtlas = process.env.MONGO_URL

mongoose.connect(MongoAtlas, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(res => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`)
    });
})
.catch(err => console.log(err));