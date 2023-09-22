import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import { Button , FormControl } from '@mui/material';

function GoalForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          {/* <label htmlFor='text'>Goal</label> */}
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            placeholder='Enter goal you want to set'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <FormControl fullWidth>
          <Button  
            type='submit'
            variant='contained'
            size='large'
            sx={{
              backgroundColor : 'black',
              color : 'white',
              ':hover' : {
                backgroundColor : 'white',
                color : 'black'
              }
            }}
          >
            Add Goal
          </Button>
        </FormControl>
      </form>
    </section>
  )
}

export default GoalForm
