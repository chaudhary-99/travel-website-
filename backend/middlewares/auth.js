const { getUser, getToken } = require("../services/auth");

async function restrictedToLoggedinUsersOnly(req, res, next) {
  const token = getToken(req.headers["authorization"]);

  const decoded = getUser(token);
  
  if (!user) {
    return res.json({message: "You have to Login first"});
    // Temporary returning message now user should render to login page
  }

  req.body.Email = decoded.Email;
  next();
}

async function checkAuth(req, res, next) {
  const token = getToken(authHeader.split("Bearer ")[1]);

  const decoded = getUser(token);

  if (decoded) {
    res.redirect('/profile');
  }

  next();
}

module.exports = {
  checkAuth,
  restrictedToLoggedinUsersOnly,
};
