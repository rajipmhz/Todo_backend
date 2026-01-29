const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken");

const generateAccessToken = (payload) => {
  if (!payload.id) throw new Error("Cannot generate access token: user id missing");

  return jwt.sign(
    { id: payload.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = async (payload) => {
  const { id } = payload;
  if (!id) throw new Error("Cannot generate refresh token: user id missing");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

  await RefreshToken.create({
    token,
    user_id: id, 
    revoked: false,
    expiresAt,
  });

  return token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
