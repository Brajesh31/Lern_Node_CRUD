const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./Model/person");

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            console.log("Received credentials", username, password);
            const user = await Person.findOne({ username });

            if (!user) return done(null, false, { message: "Incorrect Username" });
            const isPasswordmatch = user.comaparedPassword(password);
            const isPasswordValid = user.password === password;
            if (!isPasswordValid) return done(null, false, { message: "Incorrect Password" });

            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }
));

module.exports = passport;
