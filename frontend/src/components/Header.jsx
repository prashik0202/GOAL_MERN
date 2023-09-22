import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Avatar
                sx={{ backgroundColor : '#3f51b5'}}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </li>
            <li>
              <Button
                onClick={onLogout}
                variant='conatained'
                sx={{ 
                  backgroundColor : 'red',
                  color : 'white',
                  ':hover' : {
                    backgroundColor : 'white',
                    color : 'red'
                  }
                }}
                endIcon={<FaSignOutAlt />}
              >
                Logout
              </Button>
            </li>
            
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
