import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Button } from '@mui/material'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email:</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <Button variant='contained' onClick={handleSubmit}>Login</Button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
