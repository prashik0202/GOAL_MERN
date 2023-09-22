import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import {Grid } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        {/* <h1>Welcome {user && user.name}</h1> */}
        <p>{user && user.name}'s Goals Dashboard</p>
      </section>

      <GoalForm />

      <section >
        {goals.length > 0 ? (
          <div >
            <Grid container spacing={3}>
            {goals.map((goal) => (
              <Grid item xs={12} sm={4} md={3}>
                <GoalItem key={goal._id} goal={goal} />
              </Grid>
            ))}
            </Grid>
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
