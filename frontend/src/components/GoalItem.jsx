import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <IconButton onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        <DeleteIcon sx={{ color : 'red'}}/>
      </IconButton>
    </div>
  )
}

export default GoalItem
