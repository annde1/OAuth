const User = require("../database/model/user-model");

const checkUserExists = async (id) => {
  try {
    const user = await User.findOne({ googleId: id });
    return user;
  } catch (err) {
    console.log(err);
  }
};

const checkUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (profileInfo, done) => {
  try {
    //Check if user already exists in the database
    const userExists = await checkUserExists(profileInfo.id);
    //If he exists then return early
    if (userExists) {
      return done(null, userExists);
    }
    //Create new user
    const user = new User({
      userName: profileInfo.displayName,
      googleId: profileInfo.id,
      photoUrl: profileInfo.photos[0].value,
    });

    const savedUser = await user.save();
    return { status: 201, userDetails: savedUser }, done(null, savedUser); //when calling done it moves up to the passport serializeUser with user information that was saved in database
  } catch (err) {
    console.error(err);
    return { status: 500, error: err };
  }
};

module.exports = { createUser, checkUser };
