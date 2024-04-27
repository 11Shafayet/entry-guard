const jwt = require('jsonwebtoken');

export const otpGenerator = () => {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  return otp;
};

export const tokenGenerator = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2d',
  });
  return token;
};
