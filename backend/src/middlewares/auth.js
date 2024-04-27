const jwt = require('jsonwebtoken');

export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    try {
      const bearer = token.split(' ');
      const bearerToken = bearer[1];

      const decodedData = jwt.verify(
        bearerToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      req.user = decodedData;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, msg: 'Invalid Token!' });
    }
  } else {
    return res.status(400).json({ success: false, msg: 'Token not Found!' });
  }
};
