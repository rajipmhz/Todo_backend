const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/tokenService");
const {
  register,
  validateUser,
  findUserById,
} = require("../services/userService");

const registerController = async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = await generateRefreshToken({ id: user.id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const refreshController = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const storedToken = await RefreshToken.findOne({
      where: { token, revoked: false },
    });
    if (!storedToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return res
        .status(403)
        .json({ message: "Expired or invalid refresh token" });
    }

    await RefreshToken.update({ revoked: true }, { where: { token } });

    const newRefreshToken = await generateRefreshToken({ id: payload.id });
    const accessToken = generateAccessToken({ id: payload.id });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const logoutController = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      await RefreshToken.update({ revoked: true }, { where: { token } });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  registerController,
  loginController,
  refreshController,
  logoutController,
  getCurrentUser,
};
