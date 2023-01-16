import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utility/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT,
      { expiresIn: "1d" }
    );

    const { password, ...otherDetails } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails, token: token });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Felhasználó nem található"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Rossz felhasználónév vagy jelszó"));

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT,
      { expiresIn: "10d" }
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: false,
      })
      .status(200)
      .json({ ...otherDetails, token: token });
  } catch (err) {
    next(err);
  }
};
