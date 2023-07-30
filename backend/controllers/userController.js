const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id} , process.env.JWT_SECRET , {
    expiresIn : '30d'
  })
}
/**
 * @desc    Create User
 * @route   POST /api/user/
 * @access  Public
 */
const registerUser = asyncHandler(async( req, res ) => {

  const { name , email , password } = req.body;
  if(!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  // cheaking if user exixts or not
  const userExist = await User.findOne({email});
  if(userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hashing password:
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password,salt);
  
  // creating a user and store in DB:
  const user = await User.create({
    name,
    email,
    password : hashPassword,
  });

  if(user) {
    res.status(201).json({
      _id : user.id,
      name : user.name,
      email : user.email,
      token : generateToken(user._id)
    })
  }else{
    res.status(400);
    throw new Error("Invalid user data")
  }
});

/**
 * @desc    Authenticate User
 * @route   POST /api/user/login
 * @access  Public
 */
const loginUser = asyncHandler(async( req, res ) => {

  const { email , password } = req.body;

  // check for user email:
  const user = await User.findOne({email});

  if(user && (await bcrypt.compare(password,user.password))){
    res.status(200).json({
      _id : user.id,
      name : user.name,
      email : user.email,
      token : generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error("Invalid credentials")
  }
  // res.status(200).json({ message : 'User Login'});
});

/**
 * @desc    Get user data
 * @route   GET /api/user/me
 * @access  Private
 */
const getUser = asyncHandler(async( req, res ) => {
  res.status(200).json(req.user);
});



module.exports = {
  registerUser,
  loginUser,
  getUser
}