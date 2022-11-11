const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("./routes/api/users");
const AddProduct = require("./routes/api/addItem");
const AddHostel = require("./routes/api/addhostel");
const SearchProduct = require("./routes/api/searchproduct");
const SearchHostel = require("./routes/api/searchhostel");
const Mainpage = require("./routes/api/mainPage");
const Profile = require("./routes/api/profile");
const Cart = require("./routes/api/cart");
const rating = require('./routes/api/userRating');
const Payment = require("./routes/api/payment");
const config = require('config');
const app = express();
const cors = require("cors");
// Body parser middleware
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
// DB Config
const db = config.get('mongoURI');
// Connect to MongoDB
mongoose
    .connect(
        db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/users", AddProduct);
app.use("/api/users",AddHostel);
app.use("/api/users", SearchProduct);
app.use("/api/users",SearchHostel);
app.use("/api/users", Payment);
app.use("/api/users",Mainpage);
app.use("/api/users",Cart);
app.use("/api/users",Profile);
app.use("/api/users",rating);

/* //Serve static assets if in production
if (process.env.NODE_ENV = "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
 */

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));