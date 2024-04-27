const jwt = require('jsonwebtoken');

const otpGenerator = () => {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  return otp;
};

const tokenGenerator = (userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2d',
  });
  return token;
};

module.exports = { otpGenerator, tokenGenerator };
