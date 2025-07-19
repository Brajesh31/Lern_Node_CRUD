const express = require("express");
const app = express();
const connectDB = require("./Database/db");
const menuRoutes = require("./Routes/menuRoutes");
const personRoutes = require("./Routes/personRoutes");
require("dotenv").config();

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}]  this is time`);
    console.log(`[${req.url}] this is url`);
    next();
}

// Routes
app.use(logRequest);

// auth code
const passport = require("./auth");
app.use(passport.initialize());
const localAuthmiddlware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
    res.send("Welcome to the Hotel");
});

app.use("/menu", menuRoutes);
app.use("/", personRoutes);

app.listen(5000)

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
});
