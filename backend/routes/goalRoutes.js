const express = require('express');
const router = express.Router();

const {getGoal,postGoal,putGoal,deleteGoal} = require('../controllers/goalController');
const { protect }  = require('../middleware/authMiddleware');

router.get('/' ,protect, getGoal)
router.post('/' ,protect, postGoal)
router.put('/:id',protect,putGoal)
router.delete('/:id',protect,deleteGoal)

module.exports = router;
