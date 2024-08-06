const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, userName: user.userName, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
    console.log(e.message);
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    const user = await User.signup(email, userName, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, userName, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { signupUser, loginUser };
