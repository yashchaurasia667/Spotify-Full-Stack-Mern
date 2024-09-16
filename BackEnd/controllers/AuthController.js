import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const signup = async (req, res) => {
  try {
    const { email, password, name, year, month, day } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message:
          "A Spotify account already exists with this email please log in",
        success: false,
      });
    }

    const userModel = new UserModel({
      email,
      password,
      name,
      year,
      month,
      day,
    });

    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201).json({
      message: "Signed up successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: "We could not find a user with this email",
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successfull",
      success: true,
      jwtToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "user does not exist with this email"
      });
    }
    else
      return res.status(409).json({
        success: false,
        message: "user already exists"
      })
  }
  catch (error) {
    console.log(`Something went wrong finding user ${error}`);
  }
}

export { signup, login, checkUser };
