const asyncHandler = require('express-async-handler');
const Goal = require('../models/Goal');
const User =  require('../models/User');

/**
 * @desc    Get Goals
 * @route   GET /api/goals
 * @access  Private
 */
const getGoal = asyncHandler(async(req,res) => {
  const goals = await Goal.find({ user : req.user.id });
  res.status(200).json(goals)
});

/**
 * @desc    Post Goals
 * @route   POST /api/goals
 * @access  Private
 */
const postGoal = asyncHandler(async(req,res) => {

  if(!req.body.text){
    res.status(400)
    throw new Error('Please enter the text area!');
  }
  const goal = await Goal.create({
    text : req.body.text,
    user : req.user.id,
  })
  res.status(200).json(goal)
});

/**
 * @desc    Update Goals
 * @route   PUT /api/goals/:id
 * @access  Private
 */
const putGoal = asyncHandler(async(req,res) => {
  const goal = await Goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error("Goal not found");
  }


  if(!req.user) {
    res.status(401);
    throw new Error("User not Found"); 
  }

  // make sure the logged in user match the goal user
  if(goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User is not authorised");

  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body , { new : true})
  res.status(200).json(updatedGoal)
});

/**
 * @desc    Delete Goals
 * @route   DELETE /api/goals/:id
 * @access  Private
 */
const deleteGoal = asyncHandler(async(req,res) => {
  const goal = await Goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error("Goal not found");
  }

  if(!req.user) {
    res.status(401);
    throw new Error("User not Found"); 
  }

  // make sure the logged in user match the goal user
  if(goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User is not authorised");
    
  }
  await goal.deleteOne({id : req.params.id})
  res.status(200).json({ id : req.params.id })
});

module.exports = {
  getGoal,
  postGoal,
  putGoal,
  deleteGoal,
}