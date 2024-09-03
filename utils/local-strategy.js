const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Serialize user to save only the user ID in the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user by finding them in the database using the ID stored in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(null, false); // No error, but user not found
    done(null, user); // No error, user found
  } catch (err) {
    done(err, null); // Error occurred
  }
});

// Setting up LocalStrategy for passport
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Find user by username
        const user = await User.findOne({ email: email });
        if (!user) {
          // User not found
          return done(null, false, { message: "email or password Incorrect." });
        }

        // Compare passwords
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          // Password does not match
          return done(null, false, { message: "email or password Incorrect." });
        }

        // No error, user authenticated successfully
        return done(null, user);
      } catch (err) {
        // Error occurred
        return done(err);
      }
    }
  )
);

module.exports = passport;
