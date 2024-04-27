const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { sendMail } = require('../utils/mailer');
const { otpGenerator, tokenGenerator } = require('../utils/utils');

//register user
const registerUser = (userCollection) => async (req, res) => {
  const data = req.body;
  const { email, password, firstName, lastName, contactMode } = data;

  if (!email || !password || !firstName || !lastName || !contactMode) {
    res
      .status(400)
      .json({ success: false, msg: 'Please fill up all the fields!' });
    return;
  }

  const isUserExists = await userCollection.findOne({ email });

  if (isUserExists) {
    res
      .status(400)
      .json({ success: false, msg: 'User already exists with this email!' });

    return;
  } else {
    // password hashing
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(password, salt);

    // token generating
    const token = tokenGenerator((user = email));

    const newData = {
      email,
      password: encryptedPassword,
      firstName,
      lastName,
      contactMode,
    };

    const dataWithID = { _id: new ObjectId(), ...newData };
    await userCollection.insertOne(dataWithID);

    res.status(200).json({
      success: true,
      msg: 'Your Registration was successful!',
      user: { _id: dataWithID._id, firstName, lastName, email, contactMode },
      token,
    });
  }
};

// login user
const loginUser = (userCollection) => async (req, res) => {
  const { email, password } = req.body;
  const isUserExists = await userCollection.findOne({ email });
  if (isUserExists) {
    const matchPassword = await bcrypt.compare(password, isUserExists.password);

    const { _id, firstName, lastName, email, contactMode } = isUserExists;
    if (matchPassword) {
      // token generating
      const token = tokenGenerator(isUserExists.email);

      res.status(200).json({
        success: true,
        msg: 'Logged in successfully!',
        user: { _id, firstName, lastName, email, contactMode },
        token,
      });
    } else {
      res.status(400).json({
        success: true,
        msg: 'Incorrect Password!',
      });
      return;
    }
  } else {
    res.status(400).json({
      success: true,
      msg: 'User does not exist. Incorrect email address!',
    });
    return;
  }
};

// otp verification
const otpVerication = (userCollection) => async (req, res) => {
  const { email, firstname } = req.body;
  let subject = 'OTP code from Entry Guard';
  const otp = otpGenerator();
  let content = `<div>
  <h2>Hello ${firstname},</h2>
  <br/>
  <p>Your onetime OTP is: <b>${otp}</b>
  </div>`;

  const isUserExists = await userCollection.findOne({ email });

  if (isUserExists) {
    res
      .status(400)
      .json({ success: false, msg: 'User already exists with this email!' });
    return;
  } else {
    sendMail(email, subject, content);
    res.status(200).json({ otp });
  }
};

// change password
const changePass = (userCollection) => async (req, res) => {
  const { currentPassword, newPassword, _id } = req.body;

  const user = await userCollection.findOne({ _id: new ObjectId(_id) });

  if (user) {
    const matchPassword = await bcrypt.compare(currentPassword, user.password);

    if (matchPassword) {
      res.status(200);
      const salt = await bcrypt.genSalt(10);
      encryptedPassword = await bcrypt.hash(newPassword, salt);
      await userCollection.findOneAndUpdate(
        {
          _id: new ObjectId(_id),
        },
        { $set: { password: encryptedPassword } }
      );

      res.status(200).json({ msg: 'Password changed successfully!' });
    } else {
      res.status(400).json({ msg: 'Incorrect current password!' });
      return;
    }
  } else {
    res.status(400).json({ msg: 'User does not exist' });
    return;
  }
};

module.exports = {
  registerUser,
  loginUser,
  otpVerication,
  changePass,
};
