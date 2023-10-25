import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handeClick = () => {
    logout()
  }

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <ElectricBoltIcon />

            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, marginLeft: '10px' }}
            >
              FlashLearn
            </Typography>
            {user && (
              <div>
                <Button variant='outlined' onClick={handeClick} color='inherit'>
                  Logout
                </Button>
              </div>
            )}
            {!user && (
              <div>
                <Button
                  sx={{ marginRight: '10px' }}
                  variant='outlined'
                  component={Link}
                  to='/login'
                  color='inherit'
                >
                  Login
                </Button>
                <Button
                  variant='outlined'
                  component={Link}
                  to='/signup'
                  color='inherit'
                >
                  Signup
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  )
}

export default Navbar
