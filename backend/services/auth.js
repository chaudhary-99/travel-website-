const jwt = require("jsonwebtoken");
require("dotenv").config();

function setUser(user) {
  return jwt.sign(
    {
      Email: user.email,
    },
    process.env.JWT_SECRET,
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function getToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split("Bearer ")[1];
  return token;
}

module.exports = {
  setUser,
  getUser,
  getToken,
};
