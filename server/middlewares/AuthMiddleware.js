const { verify } = require('jsonwebtoken');

// middleware function ran everytime we want to check the authentification of the user
// ex: validateToken() when user want to add a comment, or create a new post
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "User not logged in!" });
  }

  try {
    const validToken = verify(accessToken, "IMPORT_SECRET_CHANGE_LATER");
    req.user = validToken;
    
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };