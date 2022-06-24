import bcrypt from "bcryptjs";

import User from "../model/userDetails.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const logout = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const register = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    contactNo,
    userId,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const userIdCheck = await User.findOne({ userId });
    if (existingUser || userIdCheck)
      return res.status(400).json({ message: "User already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      contactNo,
      userId,
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const hashPassword = await bcrypt.hash(password, 12);

      const result = await User.findOneAndUpdate(
        {
          email,
        },
        {
          password: hashPassword,
        }
      );

      res.status(200).json({ result });
    } else return res.status(400).json({ message: "Something went wrong..." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const getUser = await User.find({ userId: new RegExp(username, "i") });
    if (getUser.length > 0) {
      res.status(200).json(getUser);
    } else {
      res.status(404).json({ message: "User Not Available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const getUser = await User.find();
    if (getUser.length > 0) {
      res.status(200).json(getUser);
    } else {
      res.status(404).json({ message: "User Not Available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};
