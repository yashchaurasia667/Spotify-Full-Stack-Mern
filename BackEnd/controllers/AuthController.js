import userModel from "../models/User.js";

const signup = async (req, res) => {
  try {
    const { email, password, name, year, month, day } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message:
          "A Spotify account already exists with this email please log in",
        success: false,
      });
    }
  } catch (error) {}
};

export { signup };
