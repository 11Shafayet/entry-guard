const express = require('express');
const {
  registerUser,
  loginUser,
  otpVerication,
  changePass,
} = require('../controllers/userControllers');

const router = express.Router();

module.exports = function (userCollection) {
  router.post('/', registerUser(userCollection));
  router.post('/login', loginUser(userCollection));
  router.post('/otp', otpVerication(userCollection));
  router.post('/change-password', changePass(userCollection));
  return router;
};
